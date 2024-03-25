import re


def is_valid_phone(phone):
    pattern = re.compile(r"[7]\d{10}")
    if pattern.match(phone) and len(phone) == 11:
        return True

    return False
