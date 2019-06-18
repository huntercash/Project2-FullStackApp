import pandas as pd
from csv import reader

import numpy as np


opened_file = open("stu_loan_debt_snapshot.csv")

read_file = reader(opened_file )

stu_loan_debt_snapshot = list(read_file)
stu_loan_debt_snapshot= (stu_loan_debt_snapshot[1:])

print(stu_loan_debt_snapshot)

html_snapshot = stu_loan_debt_snapshot.to_html()
