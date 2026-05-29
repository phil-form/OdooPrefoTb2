#include <stdio.h>
#include <stdlib.h>

void printHelp()
{
    printf("Utilisation : \n");
    printf("solution1 n \n");
    printf("Ou n est un nombre strictement supérieur à 0\n");
}

void solution2(int n)
{
    for(int a = 0; a <= n; a++)
    {
        for(int b = 0; b <= n; b++)
        {
            int c = n - (a +b);
            if(c >= 0)
            {
                printf("a : %d \t b : %d \t c : %d \n", a, b, c);
            }
        }
    }
}

void solution1(int n)
{
    for(int a = 0; a <= n; a++)
    {
        for(int b = 0; b <= n; b++)
        {
            for(int c = 0; c <= n; c++)
            {
                if(a + b + c == n)
                {
                    printf("a : %d \t b : %d \t c : %d \n", a, b, c);
                }
            }
        }
    }
}

int main(int argc, char** argv)
{
    if(argc != 2)
    {
        printHelp();
        return 1;
    }

    int n = atoi(argv[1]);
    
    if(n < 1)
    {
        printHelp();
        return 2;
    }

    solution2(n);

    return 0;   
}