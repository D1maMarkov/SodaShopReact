from utils.enum import ModelEnum


class OrderStates(ModelEnum):
    pick_up_point = "At the pick-up point"
    warehouse = "In the warehouse"
    on_way = "On the way"


class Delivers(ModelEnum):
    courier = "Courier"
    pickup = "Pickup"


class Payments(ModelEnum):
    cash = "By cash"
    card = "Bank card"
