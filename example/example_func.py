my_list = [1, 2, 3, 4, 5]

def square(x):
    return x * x 

squared_list1 = list(map(square, my_list))
squared_list2 = list(map(lambda x: x * x, my_list))

print(squared_list1)
print(squared_list2)


def example(a: int, b: int) -> int:
    """Cette fonction prend deux entiers et retourne leur somme."""
    return a + b

print(example("3", "4"))

def example2(a: int, b: list[int]) -> dict[str, list[int]]:
    """Ici j'aurai l'autocomplete."""
    b.append(a)

    return { "values": b }

val = example2(3, [14, 15])
print(val)
"""Ici j'ai l'auto complétion grace à -> dict[...]"""
val.items()

# args & kwargs

def example_args(*args):
    for arg in args:
        print(arg)

def no_args(args):
    print(args)

example_args(1, 2, 3, 5, 7)
no_args([1, 2, 3, 5, 7])

def example_kwargs(**kwargs):
    print(kwargs)

example_kwargs(key="value", new_key="new_value", new_key2="new_value2")

def find_one(**kargs):
    print(f"SELECT * FROM users WHERE ", ' AND '.join(map(lambda k: f"{k[0]} = '{k[1]}'", kargs.items())))


find_one(username="admin", email="toto@gmail.com")

def my_function(a, b, c):
    return a + b + c

my_function(b=3, a=4, c=5)

print("Hello", "world", end="\n\n", sep="-")