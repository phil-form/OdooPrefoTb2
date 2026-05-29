import threading

import time

from Entity.Circuit import Circuit
from Entity.Concurrent import Concurent

class Course:

    def __init__(self, name: str, circuit: Circuit, nbLap: int, price: int) -> None:
        self.__name = name
        self.__circuit = circuit
        self.__nbLap = nbLap
        self.__price = price
        self.__concurrents = []
        self.__start_course = False
        self.__start_lock = threading.Lock()
        self.__start_lock_lock = threading.Lock()

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value: str):
        self.__name = value

    @property
    def circuit(self) -> Circuit:
        return self.__circuit

    @circuit.setter
    def circuit(self, value: Circuit):
        self.__circuit = value

    @property
    def nbLap(self) -> Circuit:
        return self.__nbLap

    @nbLap.setter
    def nbLap(self, value: int):
        self.__nbLap = value

    @property
    def price(self) -> Circuit:
        return self.__price

    @price.setter
    def price(self, value: int):
        if value < self.price:
            raise ValueError()

        self.__price = value

    @property
    def concurrents(self):
        return tuple(self.__concurrents)

    def addConcurrent(self, value: Concurent):
        if value != None:
            self.__concurrents.append(value)

    
    def startCourse(self):
        def start(concurrent: Concurent, nbLap: int):
            with self.__start_lock_lock:
                while True:
                    with self.__start_lock:
                        if self.__start_course:
                            break

                    time.sleep(1)

            print(f"{concurrent.name} Démarre!!!")
            for i in range(nbLap):
                concurrent.doLap(self.circuit)

        threads = []
        for concurrent in self.__concurrents:
            thd = threading.Thread(target=start, args=(concurrent,self.nbLap))
            threads.append(thd)
            thd.start()

        with self.__start_lock:
            self.__start_course = True

        for thread in threads:
            thread.join()

    def getWinner(self):
        winner = self.__concurrents[0]

        for concurrent in  self.__concurrents:
            print(concurrent.__dict__)
            print(concurrent.totalTime)
            if concurrent.totalTime < winner.totalTime:
                winner = concurrent

        return winner

    # special methods

    def __len__(self) -> int:
        return len(self.__concurrents)

    def __iter__(self):
        self.current = 0
        # return self.__concurrents.__init__()
        return self

    def __next__(self):
        itr = self.current

        if itr >= len(self.__concurrents):
            raise StopIteration

        self.current = itr + 1

        return self.__concurrents[itr - 1]

    def __contains__(self, value):
        return True if value in self.__concurrents else False

    def __getitem__(self, key):
        return self.__concurrents[key]

    