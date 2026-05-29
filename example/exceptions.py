import traceback

try:
    a = 0
    b = 5
    print(b / a)
except Exception as e:
    print("Division by zero")
    traceback.print_exc()
finally:
    print("finally")

print("Hello wolrd")