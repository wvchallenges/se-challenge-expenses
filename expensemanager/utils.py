def generate_key(year, month):
    """
    generates a key based on the provided year and month
    result = (year * 100) + month
    """
    return (year * 100) + month


def generate_sorted_list(dictionnary):
    """
    sorts the dictionnary keys and based on that order, returns a list of dictionnary values
    """
    sorted_values = []
    sorted_keys = sorted(dictionnary)
    for key in sorted_keys:
        sorted_values.append(dictionnary[key])
    return sorted_values
