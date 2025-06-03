
// for admin
let adminPassword = document.getElementById('adminPassword')
let adminName = document.getElementById('adminName')
let displayUserTableBtn = document.getElementById('displayUserTableBtn')
let spinnerLoad = document.getElementById('spinnerLoad')

displayUserTableBtn?.addEventListener('click', function (e) {
    e.preventDefault()
    if (adminName.value === 'admin' && adminPassword.value === '1234') {
        getAllUsers()
        displayTable()
    } else {
        displayDanger()
    }
})

function displayDanger() {
    document.getElementById('dangerMsg').classList.remove('d-none')
}
function displayTable() {
    document.getElementById('dangerMsg').classList.add('d-none')
    document.getElementById('adminForm').classList.add('d-none')
    document.getElementById('userTable').classList.remove('d-none')
}

// calc tbro3
let moneyInp = document.getElementById('moneyInp')
let moneyBtn = document.getElementById('moneyBtn')
let total = document.getElementById('total')
let userPayment = document.getElementById('userPayment')

totalMoney = 0
function getData() {
    if (moneyInp.value >= 50) {
        let salaryCalc = (moneyInp.value * 0.025)
        totalMoney = salaryCalc.toFixed(2)
        total.innerHTML = totalMoney
    }

}

// for register
let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let userPhone = document.getElementById('userPhone')
let getBtn = document.getElementById('getBtn')

let userData = {
    name: '',
    email: '',
    phone: '',
    payment: '',
}
let allUsers = []

async function getAllUsers() {
    const url = "https://apoc3939betest3.vercel.app/api/v1/users";
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
                <td>0${user.phone}</td>
                <td>${user.payment}</td></tr>`
        })
        document.getElementById('userData').innerHTML = cartoona
        spinnerLoad.classList.add('d-none')
    } catch (error) {
        console.error(error.message);
    }
}

//---------------------------
let validUserName = ''
let validUserEmail = ''
let validUserPay = ''
let validUserPhone = ''
userName?.addEventListener('input', () => {
    function validation() {
        if (userName.value !== '') {
            document.querySelector('#userValid').classList.add('d-none')
            return userName.value
        }
        document.querySelector('#userValid').classList.remove('d-none')
    }
    validUserName = validation()
    // console.log(validUserName);
})
userEmail?.addEventListener('input', () => {
    let regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    function validation() {
        if (userEmail.value !== '' && regexEmail.test(userEmail.value)) {
            document.querySelector('#emailValid').classList.add('d-none')
            return userEmail.value
        }
        document.querySelector('#emailValid').classList.remove('d-none')
    }
    validUserEmail = validation()
    // console.log(validUserName);
})
userPhone?.addEventListener('input', () => {
    let regexpNum = /^01[0-2,5]{1}[0-9]{8}$/;
    function validation() {
        if (userPhone.value !== '' && regexpNum.test(userPhone.value)) {
            document.querySelector('#phoneValid').classList.add('d-none')
            return userPhone.value
        }
        document.querySelector('#phoneValid').classList.remove('d-none')
    }
    validUserPhone = validation()
    // console.log(validUserName);
})
userPayment?.addEventListener('input', () => {
    function validation() {
        if (userPayment.value !== '') {
            document.querySelector('#paymentValid').classList.add('d-none')
            return userPayment.value
        }
        document.querySelector('#paymentValid').classList.remove('d-none')
    }
    validUserPay = validation()
    // console.log(validUserName);
})
//---------------------------

async function rigester() {
    // const url = "http://localhost:5000/api/v1/register";
    const url = "https://apoc3939betest3.vercel.app/api/v1/register";
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: validUserName,
                email: validUserEmail,
                phone: validUserPhone,
                payment: validUserPay,
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

//payment
let paymentBtn = document.getElementById('paymentBtn')
let spinnerLoadBtn = document.getElementById('spinnerLoadBtn')

function loadingDisplay() {
    paymentBtn.classList.add('d-none')
    spinnerLoadBtn.classList.remove('d-none')
}
paymentBtn?.addEventListener('click', async (e) => {
    e.preventDefault()
    rigester()
    loadingDisplay()
    await fetch('https://apoc3939betest3.vercel.app/api/v1/register/create-checkout-session/682649627d11fb0aa148216a', {
        method: 'POST',
        body: JSON.stringify({
            name: validUserName,
            email: validUserEmail,
            payment: validUserPay,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (res) => {
        if (res.ok) return res.json()

    }).then(({ url }) => {
        window.location.href = url
        // console.log(url);

    }).catch((err) => console.log(err.error)
    )

})

// progress bar
let progress = document.querySelector('.progress')
let progressBar = document.querySelector('.progress-bar')

function calcProgressWidth() {
    let collectMoney = Number(document.querySelector('#collectMoney')?.innerHTML)
    let totalMoney = Number(document.querySelector('#totalMoney')?.innerHTML)
    progressBar.style.width = `${collectMoney * 100 / totalMoney}%`
    progressBar.innerHTML = `${Math.ceil(collectMoney * 100 / totalMoney)}%`

}


let items = document.querySelectorAll('.dropdown-item')
let choosenValue = 0
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function () {
        choosenValue = items[i].value
        document.getElementById('choosenValue').innerHTML=choosenValue

    })

}





let offsetTop = $('#whoWeAre').offset()?.top
$(window).scroll(function () {
    let windowTop = $(window).scrollTop()
    if (window.innerWidth < 992) {
        document.getElementById('scrollSmNav')?.classList.remove("d-none");
    } else {
        document.getElementById('scrollSmNav').classList.add("d-none");
    }
    if (windowTop > offsetTop) {
        document.getElementById('toUp').classList.remove("opacity-0");
        document.getElementById('scrollNav')?.classList.remove("d-none");
        // if (window.innerWidth > 992) {
        //     document.getElementById('scrollSmNav').classList.add("d-none");
        // } else {
        //     document.querySelector('#dropNav').addEventListener('click', () => {
        //         document.querySelector('.res-nav').classList.remove('d-none')
        //         document.body.classList.add("overflow-hidden")
        //     })
        //     document.getElementById('closeDropNav').addEventListener('click', () => {
        //         document.querySelector('.res-nav').classList.add('d-none')
        //         document.body.classList.remove("overflow-hidden")
        //     })
        //     document.getElementById('scrollSmNav').classList.remove("d-none");
        // }
    } else {
        document.getElementById('toUp').classList.add("opacity-0");
        document.getElementById('scrollNav')?.classList?.add("d-none");
        document.getElementById('scrollSmNav')?.classList.add("d-none");
    }

});
document.querySelector('#dropNav').addEventListener('click', () => {
    document.querySelector('.res-nav').classList.remove('d-none')
    document.body.classList.add("overflow-hidden")
})
document.getElementById('closeDropNav').addEventListener('click', () => {
    document.querySelector('.res-nav').classList.add('d-none')
    document.body.classList.remove("overflow-hidden")
})

calcProgressWidth()