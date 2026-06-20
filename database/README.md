Generate synthetic credit-card data and save to SQLite

Files created:

- create_credit_data.py — Python script to generate records and save into a `.db` file.

Requirements:

```
pip install pandas faker
```

Quick start:

```
python create_credit_data.py --count 200 --db-file credit_cards.db
```

This writes a SQLite database `credit_cards.db` with a table named `credit_cards` containing the generated rows.
