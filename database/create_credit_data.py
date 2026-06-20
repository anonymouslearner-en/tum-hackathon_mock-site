#!/usr/bin/env python3
"""
Generate random (synthetic) credit-card records and save them into a SQLite .db file.
Usage: python create_credit_data.py --count 100 --db-file credit_cards.db
"""

import argparse
import random
import sqlite3
from datetime import datetime, timedelta

import pandas as pd
from faker import Faker

fake = Faker()


def luhn_checksum(card_number_without_checkdigit: str) -> int:
    """Return the Luhn check digit for the given numeric string."""
    digits = [int(d) for d in card_number_without_checkdigit]
    digits.reverse()
    total = 0
    for i, d in enumerate(digits):
        if i % 2 == 0:
            d = d * 2
            if d > 9:
                d -= 9
        total += d
    check = (10 - (total % 10)) % 10
    return check


def generate_card_number(prefix: str, length: int) -> str:
    n_digits = length - len(prefix) - 1
    body = ''.join(str(random.randint(0, 9)) for _ in range(n_digits))
    partial = prefix + body
    check = luhn_checksum(partial)
    return partial + str(check)


def random_expiry_date(years_ahead=5):
    start = datetime.now()
    end = start + timedelta(days=365 * years_ahead)
    exp = fake.date_between(start_date=start + timedelta(days=30), end_date=end)
    return exp.strftime("%m/%y")


def random_cvv(card_type: str) -> str:
    # American Express uses 4-digit CVV, others 3
    if card_type == 'American Express':
        return '{:04d}'.format(random.randint(0, 9999))
    return '{:03d}'.format(random.randint(0, 999))


CARD_TYPES = [
    ('Visa', ['4'], 16),
    ('MasterCard', [str(i) for i in range(51, 56)], 16),
    ('MasterCard', [str(i) for i in range(2221, 2721)], 16),
    ('American Express', ['34', '37'], 15),
    ('Discover', ['6011', '65'], 16),
]


def choose_card_type_and_prefix():
    # Flatten options
    options = []
    for card_name, prefixes, length in CARD_TYPES:
        for p in prefixes:
            options.append((card_name, p, length))
    card_name, prefix, length = random.choice(options)
    return card_name, prefix, length


def generate_record():
    card_name, prefix, length = choose_card_type_and_prefix()
    card_number = generate_card_number(prefix, length)
    name = fake.name()
    address = fake.address().replace('\n', ', ')
    exp = random_expiry_date()
    cvv = random_cvv(card_name)
    issue_date = fake.date_between(start_date='-10y', end_date='today').isoformat()
    return {
        'name': name,
        'address': address,
        'card_type': card_name,
        'card_number': card_number,
        'expiry': exp,
        'cvv': cvv,
        'issue_date': issue_date,
    }


def generate_dataframe(count=100):
    rows = [generate_record() for _ in range(count)]
    df = pd.DataFrame(rows)
    return df


def save_to_sqlite(df: pd.DataFrame, db_file: str, table_name: str = 'credit_cards'):
    conn = sqlite3.connect(db_file)
    df.to_sql(table_name, conn, if_exists='replace', index=False)
    conn.close()


def main():
    parser = argparse.ArgumentParser(description='Generate synthetic credit-card records and save to SQLite .db')
    parser.add_argument('--count', '-n', type=int, default=100, help='Number of records to generate')
    parser.add_argument('--db-file', '-o', default='credit_cards.db', help='SQLite .db filename to write')
    parser.add_argument('--table', '-t', default='credit_cards', help='Table name inside the SQLite DB')
    args = parser.parse_args()

    df = generate_dataframe(args.count)
    save_to_sqlite(df, args.db_file, args.table)
    print(f'Wrote {len(df)} records to {args.db_file} in table "{args.table}"')


if __name__ == '__main__':
    main()