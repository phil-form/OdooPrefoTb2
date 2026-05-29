prime_nbr = [1]

for i in range(2, 101):
    is_prime = True
    for j in range(2, i):
        if i % j == 0:
            is_prime = False
            print(f"{i} is divisible by {j}")
            break
    if is_prime:
        prime_nbr.append(i)

print(prime_nbr)

# Exo 2

def int_input(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Veuillez entrer un nombre entier valide.")

print("Vous pouvez entrer" if int(input("Age : ")) >= 18 else "Vous ne pouvez pas entrer")

# Exo 3
from random import randint

def confirm_input(prompt):
    response = input(prompt + " (y/Y)")
    if response in ['y', 'Y']:
        return True
    return False

rnd = randint(1, 101)

confirm = True

while confirm:
    guess = int_input("Devinez le nombre entre 1 et 100 : ")
    if guess < rnd:
        print("Trop petit !")
    elif guess > rnd:
        print("Trop grand !")
    else:
        print("Bravo, vous avez trouvé le nombre !")
        confirm = False

    confirm = confirm_input("Voulez-vous continuer à deviner ?") if not confirm else False

# Exo 4

word = input("Entrez un mot : ")

for i in range(len(word)):
    print(word[i])

for c in word:
    print(c)
