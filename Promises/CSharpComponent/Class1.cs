using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading.Tasks;
using Windows.Foundation;

namespace CSharpComponent
{
    public sealed class Class1
    {
        private bool isPrime(long number)
        {
            for (long i = 2, limit = (long)Math.Sqrt(number); i <= limit; i++)
            {
                if (number % i == 0)
                {
                    return false;
                }
            }
            return true;
        }

        public long GetNthPrime(int n)
        {
            int numPrimesFound = 0;
            long currentNumber = 1;
            while (true)
            {
                currentNumber += 1;
                bool isPrime = this.isPrime(currentNumber);
                if (isPrime)
                {
                    numPrimesFound += 1;
                    if (numPrimesFound == n)
                        return currentNumber;
                }
            }
        }

        public IAsyncOperation<long> GetNthPrimeAsync(int n)
        {
            return Task.Run(() => this.GetNthPrime(n))
                .AsAsyncOperation();
        }

        public IAsyncOperationWithProgress<long, double> GetNthPrimeAsyncProgress(int n)
        {
            return AsyncInfo.Run<long, double>((token, progress) =>

                Task.Run<long>(() =>
                {
                    int onePercent = n / 100;
                    int numPrimesFound = 0;
                    long currentNumber = 1;
                    while (true)
                    {
                        currentNumber += 1;
                        bool isPrime = this.isPrime(currentNumber);
                        if (isPrime)
                        {
                            numPrimesFound += 1;
                            if (numPrimesFound == n)
                            {
                                return currentNumber;
                            }
                            else
                            {
                                if (numPrimesFound % onePercent == 0)
                                {
                                    progress.Report(numPrimesFound * 100 / n);
                                }
                            }
                        }
                        token.ThrowIfCancellationRequested();
                    }
                }, token)
            );
        }
    }
}
