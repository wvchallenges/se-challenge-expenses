from se_challenge import db


class Csv(db.Model):
    # Model for CSV file (ORM).
    id = db.Column(db.INT, primary_key=True, autoincrement=True)
    date = db.Column(db.TEXT)
    category = db.Column(db.TEXT)
    employee_name = db.Column(db.TEXT)
    employee_address = db.Column(db.TEXT)
    expense_description = db.Column(db.TEXT)
    pretax_amount = db.Column(db.TEXT)
    tax_name = db.Column(db.TEXT)
    tax_amount = db.Column(db.TEXT)

    def __init__(self, date, category, em_name, em_address, ex_description, pretax, t_name, tax_amount):
        self.date = date
        self.category = category
        self.employee_name = em_name
        self.employee_address = em_address
        self.expense_description = ex_description
        self.pretax_amount = pretax
        self.tax_name = t_name
        self.tax_amount = tax_amount