import file2

file2.my_function()


class MyClass:
    def __str__(self):
        return "Hello World"

    def __repr__(self):
        return "REPR"

print(f"{MyClass()!r}")