l = [0,20,7,16,1,18,15]
memory = {}
lastSpoken=0;

def newNumber(lastSpoken, turn):
    lastValue = turn - memory[lastSpoken] if ( lastSpoken in memory ) else 0;
    memory[lastSpoken] = turn;
    return lastValue;

for turn in range(1, len(l)+1):
    lastSpoken = newNumber(l[turn - 1], turn);
turn +=1;

part1=-1;
part2=-1;
N1=2020;
N2=30000000;
while (part2 == -1):
    if (turn == N1):
        part1 = lastSpoken;
    if (turn == N2):
        part2 = lastSpoken
    if (turn % 300000 == 0):
        print(turn);
    lastSpoken = newNumber(lastSpoken, turn);
    turn += 1;

print("Part 1", part1);
print("Part 2", part2);
