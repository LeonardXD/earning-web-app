document.addEventListener('DOMContentLoaded', () => {
    const coinBalanceElement = document.querySelector('.col-coin-balance p');
    const withdrawableBalanceElement = document.querySelector('.col-withdrawable-balance p');

    const coins = parseFloat(localStorage.getItem('coinBalance')) || 0;
    const withdrawableBalance = (coins / 1000).toFixed(2);

    if (coinBalanceElement) {
        coinBalanceElement.textContent = coins.toLocaleString();
    }

    if (withdrawableBalanceElement) {
        withdrawableBalanceElement.textContent = `₱${withdrawableBalance}`;
    }
});