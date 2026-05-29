# Exo 18

def calcul_moyenne(notes: list[int]) -> float:
    """Cette fonction prend une liste de notes et retourne la moyenne."""
    if len(notes) == 0:
        return 0.0

    total = 0
    for note in notes:
        total += note

    return total / len(notes)


# Exo 2

def find_min(numbers: list[int]) -> int:
    min_value = numbers[0]

    for number in numbers:
        if number < min_value:
            min_value = number

    return min_value

# Exo 3

def generate_email(*parts, domain: str = "gmail.com") -> str:
    """Cette fonction génère une adresse email à partir de plusieurs parties et d'un domaine."""
    return '.'.join(parts) + '@' + domain

# Exo 4

import re

def count_words(sentence: str) -> dict[str, int]:
    """Cette fonction compte le nombre de fois que chaque mot apparaît dans une phrase."""
    words = re.split(r"[\s']+", sentence)

    print(words)
    return len(words)


print(count_words("Hello world! Hello everyone. let's try this"))


# Exo 5

def convert_to_farenheit(celsius: float) -> float:
    """Cette fonction convertit une température de Celsius à Fahrenheit."""
    return (celsius * 9/5) + 32

# Exo 6

def split_odd_and_even(numbers: list[int]) -> tuple[list[int], list[int]]:
    """Cette fonction sépare les nombres pairs et impairs d'une liste."""
    even_numbers = []
    odd_numbers = []

    for number in numbers:
        if number % 2 == 0:
            even_numbers.append(number)
        else:
            odd_numbers.append(number)

    return even_numbers, odd_numbers

even, odd = split_odd_and_even([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

print(f"Even numbers: {even}")
print(f"Odd numbers: {odd}")

def reverse_string(s: str) -> str:
    """Cette fonction inverse une chaîne de caractères."""
    return s[::-1]

# Exo 8

def password_check(password: str) -> bool:
    """Cette fonction vérifie si un mot de passe est fort."""
    if len(password) < 8:
        return False
    if not re.match(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', password):
        return False

    return True

print(password_check("Autumn2026!"))  # True
