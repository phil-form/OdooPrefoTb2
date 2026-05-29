import threading
import time
import random

NB_PHILOSOPHES = 5

# Une fourchette = un Lock
fourchettes = [threading.Lock() for _ in range(NB_PHILOSOPHES)]
philo_data = {};


def philosophe(i):
    gauche = fourchettes[i]
    droite = fourchettes[(i + 1) % NB_PHILOSOPHES]

    while True:
        # Penser
        print(f"Philosophe {i} pense")
        time.sleep(random.uniform(0.5, 2))

        print(f"Philosophe {i} a faim")

        # Astuce anti-deadlock :
        # le dernier prend d'abord la droite
        if i == NB_PHILOSOPHES - 1:
            premiere = droite
            seconde = gauche
        else:
            premiere = gauche
            seconde = droite

        with premiere:
            print(f"Philosophe {i} prend la première fourchette")

            time.sleep(0.1)

            with seconde:
                print(f"Philosophe {i} prend la deuxième fourchette")
                print(f"Philosophe {i} mange")
                philo_data[i] = philo_data.get(i, 0) + 1
                time.sleep(random.uniform(1, 2))

        print(f"Philosophe {i} repose les fourchettes")


threads = []

for i in range(NB_PHILOSOPHES):
    t = threading.Thread(target=philosophe, args=(i,), daemon=True)
    t.start()
    threads.append(t)

# Laisser tourner un moment
time.sleep(60)

print("Nombre de repas par philosophe :")
for i in range(NB_PHILOSOPHES):
    print(f"Philosophe {i} a mangé {philo_data.get(i, 0)} fois")
print("Fin de la simulation")
