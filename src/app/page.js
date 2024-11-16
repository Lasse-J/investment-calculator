'use client'

export default function Home() {

  const incInterestHandler = () => {
    adjustInterest(1)
  }

  const decInterestHandler = () => {
    adjustInterest(-1)
  }

  const incInflationHandler = () => {
    adjustInflation(1)
  }

  const decInflationHandler = () => {
    adjustInflation(-1)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    let principal = parseFloat(document.querySelector('.initial-investment').value)
    let monthlyContribution = parseFloat(document.querySelector('.monthly-contribution').value)
    let years = parseFloat(document.querySelector('.years').value)
    let interestRate = parseFloat(document.querySelector('.interest-rate').textContent)
    let estimatedInflation = parseFloat(document.querySelector('.estimated-inflation').textContent)

    let calculatedValues = calculate(principal, monthlyContribution, years, interestRate, estimatedInflation)

    let futureValue = formatCurrency(calculatedValues.futureValue)
    let realInterestRate = (calculatedValues.realInterestRate * 100).toFixed(1)
    let futureInflationAdjustedValue = formatCurrency(calculatedValues.futureInflationAdjustedValue)

    document.querySelector('.result').innerHTML = `
      <div>
        Future Investment Value: $${futureValue}<br />
        Real Interest Rate: ${realInterestRate} %<br />
        Inflation Adjusted Value: $${futureInflationAdjustedValue}
      </div>
    `
  }

  const calculate = (principal, monthlyContribution, years, interestRate, estimatedInflation) => {
    let annualInterestRate = interestRate / 100
    let annualEstimatedInflation = estimatedInflation / 100
    let futureValue = principal

    // Compounding interest
    for(let i = 0; i < years; i++) {
      futureValue = futureValue * (1 + annualInterestRate) + (monthlyContribution * 12)
    }

    // Real interest rate
    let comp1 = 1 + annualInterestRate
    let comp2 = 1 + annualEstimatedInflation
    let comp3 = comp1 / comp2
    let realInterestRate = comp3 - 1

    // Inflation adjusted compounding interest
    let futureInflationAdjustedValue = principal

    for(let i = 0; i < years; i++) {
      futureInflationAdjustedValue = futureInflationAdjustedValue * (1 + realInterestRate) + (monthlyContribution * 12)
    }

    return { futureValue, realInterestRate, futureInflationAdjustedValue }
  }

  const resetHandler = () => {
    document.querySelector('.initial-investment').value = ''
    document.querySelector('.monthly-contribution').value = ''
    document.querySelector('.years').value = ''
    document.querySelector('.interest-rate').textContent = '0'
    document.querySelector('.estimated-inflation').textContent = '2'
    document.querySelector('.result').innerHTML = ''
  } 

  const formatCurrency = (number) => {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  const adjustInterest = (amount) => {
    const interestElement = document.querySelector('.interest-rate')
    let interest = parseFloat(interestElement.textContent)

    interest = Math.max(0, interest)
    interest = Math.max(0, interest + amount)
    interestElement.textContent = interest.toString()
  }

  const adjustInflation = (amount) => {
    const inflationElement = document.querySelector('.estimated-inflation')
    let inflation = parseFloat(inflationElement.textContent)

    inflation = Math.max(0, inflation)
    inflation = Math.max(0, inflation + amount)
    inflationElement.textContent = inflation.toString()
  }

  return (
    <div className="calculator mt-10 bg-sky-700 p-10 rounded-lg w-96 text-center">
      <h1 className="text-2xl font-bold mb-4">Investment Calculator</h1>

      <form className="calculator-form text-center mb-2" onSubmit={submitHandler}>
        <label htmlFor="initialInvestment">Initial Investment</label>
        <input type="number" className="initial-investment p-3 ml-2.5 mt-1 mb-3 mr-5 rounded border text-slate-800" placeholder="Enter amount" required></input>

        <label htmlFor="monthlyContribution">Monthly Contribution</label>
        <input type="number" className="monthly-contribution p-3 ml-2.5 mt-1 mb-3 mr-5 rounded border text-slate-800" placeholder="Enter amount" required></input>

        <label htmlFor="years">Years to Grow</label>
        <input type="number" className="years p-3 ml-2.5 mt-1 mb-3 mr-5 rounded border text-slate-800" placeholder="Enter amount" required></input>

        <label htmlFor="interestRate">Interest Rate (%)</label>
        <div className="interest-rate-control flex items-center justify-between mx-5 my-1">
          <button type="button" className="adjust-interest decrease-interest" onClick={decInterestHandler}>-</button>
          <span className="interest-rate text-2xl grow text-center mt-1 mb-3">0</span>
          <button type="button" className="adjust-interest increase-interest" onClick={incInterestHandler}>+</button>
        </div>

        <label htmlFor="estimatedInflation">Estimated Inflation (%)</label>
        <div className="estimated-inflation-control flex items-center justify-between mx-5 my-1">
          <button type="button" className="adjust-inflation decrease-inflation" onClick={decInflationHandler}>-</button>
          <span className="estimated-inflation text-2xl grow text-center mt-1 mb-3">2</span>
          <button type="button" className="adjust-inflation increase-inflation" onClick={incInflationHandler}>+</button>
        </div>

        <div className="flex justify-center py-2 space-x-3">
        <button type="submit" className="flex rounded-lg w-48 justify-center">Calculate</button>
        <button type="button" className="reset-button bg-teal-400 w-48 rounded-lg hover:border hover:text-teal-400" onClick={resetHandler}>Reset</button>
        </div>
      </form>

      <h2 className="result"></h2>

    </div>
  );
}
