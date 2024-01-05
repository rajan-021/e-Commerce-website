export function formatCurrency(priceCents){
    return (Math.round(priceCents) / 100).toFixed(2);
}

// export default formatCurrency; //by using this we can import file without {} , 1 file only have one default export
// import formatCurrency  from "./utils/money.js";