
// calc tbro3
let moneyInp = document.getElementById('moneyInp')
let moneyBtn = document.getElementById('moneyBtn')

let constructionProfitInp = document.getElementById('constructionProfitInp')
let constructionBtn = document.getElementById('constructionBtn')

let buildInp = document.getElementById('buildInp')
let buildBtn = document.getElementById('buildBtn')

let salary = document.getElementById('salary')
let construction = document.getElementById('construction')
let build = document.getElementById('build')

let total = document.getElementById('total')

totalMoney = 0
function getData() {
    let salaryCalc = (moneyInp.value * 0.025)
    salary.innerHTML = salaryCalc.toFixed(2)
    let buildCalc = (buildInp.value * 0.025)
    build.innerHTML = buildCalc.toFixed(2)
    let constructionCalc = (constructionProfitInp.value * 0.025)
    construction.innerHTML = constructionCalc.toFixed(2)

    totalMoney = salaryCalc + buildCalc + constructionCalc
    total.innerHTML = totalMoney.toFixed(2)
}

// for register

let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let userPhone = document.getElementById('userPhone')
let userPayment = document.getElementById('userPayment')
let submitBtn = document.getElementById('submitBtn')
let getBtn = document.getElementById('getBtn')

let userData = {
    name: '',
    email: '',
    phone: '',
    payment: '',
}
let allUsers = []


getBtn?.addEventListener('click', function (e) {
    e.preventDefault()
    getAllUsers()
})

submitBtn?.addEventListener('click', function (e) {
    e.preventDefault()
    rigester()
})

async function getAllUsers() {
    // const url = "http://localhost:5000/api/v1/users";
    const url = "https://apoc3939betest1.vercel.app/api/v1/users";
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const { users } = await response.json();
        let cartoona = ''
        users.map((user, index) => {
            cartoona += `<tr><td>${index + 1}</td>
            <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.payment}</td></tr>`
        })
        document.getElementById('userData').innerHTML = cartoona
    } catch (error) {
        console.error(error.message);
    }
}

async function rigester() {
    // const url = "http://localhost:5000/api/v1/register";
    const url = "https://apoc3939betest1.vercel.app/api/v1/register";
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: userName.value,
                email: userEmail.value,
                phone: userPhone.value,
                payment: userPayment.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const myjson = await response.json();
        if (myjson.message == 'success') {
            console.log(myjson);
        }
    } catch (error) {
        console.error(error.message);
    }
}

//http://localhost:3000/api/v1/user/register
//payment
let paymentBtn = document.getElementById('paymentBtn')
paymentBtn?.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log(e);

    await fetch('https://apoc3939betest1.vercel.app/api/v1/register/create-checkout-session/682649627d11fb0aa148216a', {
        method: 'POST',
        body: JSON.stringify({
            name: userName.value,
            email: userEmail.value,
            payment: userPayment.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (res) => {
        if (res.ok) return res.json()
        // const json = await res.json()
        // return await Promise.reject(json)
    }).then(({ url }) => {
        window.location.href = url
        // console.log(url);

    }).catch((err) => console.log(err.error)
    )

})
// async function payment() {
//     const url = "http://localhost:3000/api/v1/user/register/682649627d11fb0aa148216a";
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             body: JSON.stringify({
//                 name: userName.value,
//                 email: userEmail.value,
//                 payment: userPayment.value,
//             }),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }

//         const myjson = await response.json();
//         console.log(myjson);
//     } catch (error) {
//         console.error(error.message);
//     }
// }



// for nav

let offsetTop = $('#whoWeAre').offset().top
$(window).scroll(function () {
    let windowTop = $(window).scrollTop()
    if (windowTop > offsetTop) {
        document.getElementById('toUp').classList.remove("opacity-0");
        // document.getElementById('dropNav').classList.remove("opacity-0");
        document.getElementById('scrollNav')?.classList.remove("d-none");
        if (window.innerWidth > 992) {
            document.getElementById('scrollSmNav').classList.add("d-none");
        } else {
            
            document.querySelector('#dropNav').addEventListener('click', () => {
                document.querySelector('.res-nav').classList.remove('d-none')
                document.body.classList.add("overflow-hidden")
            })
            document.getElementById('closeDropNav').addEventListener('click', () => {
                document.querySelector('.res-nav').classList.add('d-none')
                document.body.classList.remove("overflow-hidden")
            })
            document.getElementById('scrollSmNav').classList.remove("d-none");
        }
    } else {
        document.getElementById('toUp').classList.add("opacity-0");
        // document.getElementById('dropNav').classList.add("opacity-0");
        document.getElementById('scrollNav')?.classList?.add("d-none");
        document.getElementById('scrollSmNav').classList.add("d-none");
    }

});


