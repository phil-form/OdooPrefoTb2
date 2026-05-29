import threading

from Entity.Voiture import Voiture
from Entity.Circuit import Circuit
import time

class Concurent:

    def __init__(self, name: str, number: int, car: Voiture) -> None:
        self.__name = name
        self.__number = number
        self.__car = car
        self.__lapTime = list()
        self.__print_lock = threading.Lock()

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value: str):
        self.__name = value

    @property
    def number(self):
        return self.__number

    @number.setter
    def number(self, value: int):
        self.__number = value

    @property
    def car(self):
        return self.__car

    @car.setter
    def car(self, value: Voiture):
        self.__car = value

    @property
    def lapTimes(self):
        return tuple(self.__lapTime)

    @property
    def totalTime(self) -> float:
        return sum(self.lapTimes)

    def doLap(self, circuit: Circuit):
        vit = self.car.getSpeed() / 3.6

        lap_time = 0
        with circuit.lock:
            distance = circuit.length
            lap_time = distance / vit

        self.__lapTime.append(lap_time)
        time.sleep(lap_time / 60)
        with self.__print_lock:
            print(f"{self.__name} lap time: {lap_time}")

    def __eq__(self, __o: object) -> bool:
        if isinstance(__o, Concurent):
            return self.name == __o.name

        return False