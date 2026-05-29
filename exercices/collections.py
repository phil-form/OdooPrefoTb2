# Exo 1

from random import randint

nbr = [randint(1, 100) for i in range(10)]

print(nbr)

total = 0
for i in nbr:
    total += i

print(f"Total : {total}")


# Exo 2 

firstname = input("Prénom : ")
lastname = input("Nom : ")

information = (firstname, lastname)

print(f"Prénom : {information[0]}, Nom : {information[1]}")

# Exo 3

import random

set1 = {randint(1, 21) for i in range(10)}
set2 = {randint(1, 21) for i in range(10)}

# exemple = set(random.sample(range(1, 21), 10))

intersection = set1.intersection(set2)

print(f"Set 1 : {set1}")
print(f"Set 2 : {set2}")
print(f"Intersection : {intersection}")

# Exo 4

fruit_prices = {
    "pomme": 0.5,
    "banane": 0.3,
    "orange": 0.7,
}

fruit = input("Entrez le nom d'un fruit (pomme, banane, orange) : ")


if fruit in fruit_prices:
    print(f"Le prix de {fruit} est {fruit_prices[fruit]} euros.")
else:
    print("Fruit non trouvé.")

# Exo 5 

people = [
    ("Alice", 30),
    ("Bob", 25),
    ("Charlie", 35),
]

oldest = people[0]

for person in people:
    if person[1] > oldest[1]:
        oldest = person

print(f"La personne la plus âgée est {oldest[0]} avec {oldest[1]} ans.")

# Exo 6

nbrs = [randint(1, 51) for i in range(10)]

print(f"Liste de nombres : {nbrs}")

# for nbr in nbrs:
#     if nbr % 2 == 0:
#         even_nbrs.append(nbr)

even_nbrs = [nbr for nbr in nbrs if nbr % 2 == 0]

# Exo 7

mots = ["chien", "chat", "oiseau", "poisson", "chien", "chat", "chien"]

unique_mots = set(mots)

print(f"Mots uniques : {unique_mots}")

# Exo 8

cours = {
    "Mathématiques": ["Alice", "Bob"],
    "Physique": ["Charlie", "Alice"],
    "Chimie": ["Bob", "Charlie"],
}

cours_to_check = input("Entrez le nom d'un cours (Mathématiques, Physique, Chimie) : ")

if cours_to_check in cours:
    print(cours[cours_to_check])
    print(', '.join(cours[cours_to_check])) 
else:
    print("Cours non trouvé.")

# Exo 9

products = {
    "pomme": 0.5,
    "banane": 0.3,
    "orange": 0.7,
}

basket = [
    ("pomme",3),
    ("banane",5),
    ("orange",2),
]

total_price = 0
for product, quantity in basket:
    if product in products:
        product_total = products[product] * quantity
        total_price += product_total
        print(f"{quantity} {product}(s) : {product_total} euros")
    else:
        print(f"Produit {product} non trouvé.")

print(f"Prix total : {total_price} euros")
# Exo 10 

employees = [
    {"name": "Alice", "salary": 3000, "department": "HR"},
    {"name": "Ben", "salary": 1000, "department": "HR"},
    {"name": "Bob", "salary": 3000, "department": "IT"},
    {"name": "Charlie", "salary": 1000, "department": "RnD"},
    {"name": "Rajenufle", "salary": 4000, "department": "RnD"},
    {"name": "Kuhn", "salary": 2000, "department": "XO"},
]

department_salaries = {}

for employee in employees:
    if employee["department"] not in department_salaries:
        department_salaries[employee["department"]] = {
            "total_salary": 0,
            "employee_count": 0
        }

    department_salaries[employee["department"]]["total_salary"] += employee["salary"]
    department_salaries[employee["department"]]["employee_count"] += 1

for department, data in department_salaries.items():
    average_salary = data["total_salary"] / data["employee_count"]
    print(f"Département : {department}, Salaire moyen : {average_salary:.2f} euros")

