
int[] numbers = { 5, 10, 8, 3, 6, 12};

//Method syntax:
IEnumerable<int> numQuery2 = numbers
  .Where(num => num % 2 == 0)
  .OrderBy(n => n);

//Query syntax:
IEnumerable<int> numQuery1 =
    from num in numbers
    where num % 2 == 0
    orderby num
    select num;

