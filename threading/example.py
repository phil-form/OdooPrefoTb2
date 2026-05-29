import threading
import time
from random import randint

def worker(n):
    for i in range(n):
        print(f"Worker {threading.current_thread().name} is working... {i}")
        time.sleep(randint(1, 3))

# Créer un thread pour exécuter la fonction worker avec un argument de 5
t = threading.Thread(target=worker, args=(5,))
t2 = threading.Thread(target=worker, args=(15,))
t3 = threading.Thread(target=worker, args=(10,))
t4 = threading.Thread(target=worker, args=(20,))

# Démarrer le thread
t.start()
t2.start()
t3.start()
t4.start()

for i in range(5):
    print(f"Main thread is working... {i}")
    time.sleep(randint(1, 3))

# Attendre que le thread se termine
t.join()
t2.join()
t3.join()
t4.join()


compteur = 0
lock = threading.Lock()

def incrementer():
    global compteur
    for _ in range(100):   
        # Verrouiller le compteur pour éviter les racing conditions
        # (Deux threads pourraient essayer de modifier le compteur en même temps)
        # -> l'état du compteur pourrait devenir incohérent

        # De préférence utiliser le with ... : 
        # Qui va libérer automatiquement le verrou même en cas d'exception
        # lock.acquire()  # Acquérir le Verrouiller
        # Si on oublie de faire lock.release() 
        # -> le verrou restera acquis indéfiniment -> les autres threads seront bloqués
        with lock:  # Acquérir le verrou avant de modifier le compteur
            compteur += 1
            print(f"Compteur: {compteur}")
            time.sleep(1)  # Simuler une opération qui prend du temps

# Créer plusieurs threads pour incrémenter le compteur
t1 = threading.Thread(target=incrementer)
t2 = threading.Thread(target=incrementer)

t1.start()
t2.start()

t1.join()
t2.join()

print(f"Compteur final: {compteur}")
