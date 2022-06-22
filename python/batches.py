
def batches(iterable, batch_size,
    exclude_last=False,
    pad_last=False, pad_value=None ):
    """
    Generator that iterates through multiple items of an iterator at a time.

    Arguments:
        iterable {Iterable} -- Object to iterate through
        batch_size {int} -- Number of items per batch
    
    Keyword Arguments:
        exclude_last {bool} -- If True, the last batch will be ignored
            (default: {False})
        pad_last {bool} -- If True, the last batch will be padded so its length
            matches batch_size (default: {False})
        pad_value {any} -- If pad_last is True, this is the value that will
            be used to pad the last batch (default: {None})
    
    Example:
        r = range(0, 5)
        for batch in batches(r, 2):
            print(batch)
        # [0, 1]
        # [2, 3]
        # [4]
    """
    batch = []
    for item in iterable:
        batch.append(item)
        if len(batch) >= batch_size:
            yield batch
            batch = []

    if exclude_last or len(batch) == 0:
        return

    if pad_last:
        batch = (batch + [pad_value] * batch_size)[:batch_size]
    yield batch

if __name__ == "__main__":
    r = range(0, 5)
    for batch in batches(r, 2):
        print(batch)