import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {browserHistory as history} from 'react-router';
import Home from './common/home.component.jsx'
import About from './common/about.component.jsx'
import Main from './common/main.component.jsx'
import Car from './car/car.component.jsx'
import CarDetail from './car/car-detail.component.jsx'
import Customer from './customer/customer.component.jsx'
import CustomerDetail from './customer/customer-detail.component.jsx'


const userData = [
    {
        "_id": "588f2ca04082b376743479e5",
        "customer_id": 1,
        "account_id": 10000,
        "field_title": "Prepaid Customer",
        "gender": "Female",
        "birth_date": "1976-07-18",
        "customer_status": 0,
        "failed_attempts": 9,
        "website_work": "unvohd830@example.com",
        "balance": -93323,
        "bonus_points": 1067,
        "date_joined": "1958-07-19",
        "date_lastvisit": "1987-04-12",
        "address": {
            "line1": "931 Green Oak Road",
            "line2": "56 Green Milton Drive",
            "town": "Auchterarder",
            "city": "Poole",
            "state": "California",
            "country": "Morocco",
            "zipcode": 2169
        },
        "deliveraddress": {
            "line1": "636 White Second Blvd.",
            "line2": "26 White Nobel Boulevard",
            "town": "Penicuik",
            "city": "El Paso",
            "state": "Pennsylvania",
            "country": "Estonia",
            "zipcode": 8081
        },
        "company": {
            "name": "Tipmunplor Holdings",
            "number": 68151
        },
        "email": {
            "home": "qtytujm.kxgcztmp@ufbn.vsgvfg.com",
            "work": "xlef.zvsdr@rjxemh.net",
            "verified": -1
        },
        "tel": {
            "home": 4915417591,
            "work": "763-093-5158",
            "mobile": {
                "personal": "(358) 444-9380",
                "work": "072-895-6155"
            }
        },
        "name": {
            "first": "Ivan",
            "last": "Frye",
            "user": "Arnold26"
        },
        "creditcard": {
            "type": "AmEx",
            "number": 5157840520926063
        },
        "customer_type": "Free"
    },
    {
        "_id": "588f2ca04082b376743479e6",
        "customer_id": 2,
        "account_id": 10001,
        "field_title": "Web",
        "gender": "Male",
        "birth_date": "1978-03-13",
        "customer_status": 0,
        "failed_attempts": 5,
        "website_work": "eugebpmi9@example.com",
        "balance": -47814,
        "bonus_points": 761,
        "date_joined": "1967-05-03",
        "date_lastvisit": "1983-06-23",
        "address": {
            "line1": "568 Second Parkway",
            "line2": "958 Hague Way",
            "town": "Wallasey",
            "city": "Wolverhampton",
            "state": "Montana",
            "country": "Singapore",
            "zipcode": 1889
        },
        "deliveraddress": {
            "line1": "323 Rocky Oak Boulevard",
            "line2": "54 North Green Second Boulevard",
            "town": "Winsford",
            "city": "Austin",
            "state": "New Hampshire",
            "country": "Sweden",
            "zipcode": 2375
        },
        "company": {
            "name": "Tipbanefan WorldWide",
            "number": 93358
        },
        "email": {
            "home": "tdbwvmz.hrsfoycexg@feofiy.aqlaan.com",
            "work": "gwtmpx667@bsmqoh.org",
            "verified": -1
        },
        "tel": {
            "home": "713-231-2770",
            "work": "274454-1408",
            "mobile": {
                "personal": "634-577-4500",
                "work": "(094) 698-5186"
            }
        },
        "name": {
            "first": "Angelina",
            "last": "Kirby",
            "user": "Brooke"
        },
        "creditcard": {
            "type": "VISA",
            "number": 4296723282888249
        },
        "customer_type": "Super"
    },
    {
        "_id": "588f2ca04082b376743479e7",
        "customer_id": 3,
        "account_id": 10002,
        "field_title": "Service",
        "gender": "Male",
        "birth_date": "1956-03-29",
        "customer_status": 0,
        "failed_attempts": 8,
        "website_work": "ketymtkz.gfoegpe@example.com",
        "balance": 39561,
        "bonus_points": 1864,
        "date_joined": "1954-07-28",
        "date_lastvisit": "1993-01-05",
        "address": {
            "line1": "949 Nobel St.",
            "line2": "230 Nobel Street",
            "town": "Llandrindod Wells",
            "city": "Plymouth",
            "state": "West Virginia",
            "country": "Nicaragua",
            "zipcode": 4148
        },
        "deliveraddress": {
            "line1": "876 Hague Freeway",
            "line2": "953 South Green First Drive",
            "town": "Hove",
            "city": "Jacksonville",
            "state": "Texas",
            "country": "Malta",
            "zipcode": 3184
        },
        "company": {
            "name": "Pardudamin",
            "number": 918
        },
        "email": {
            "home": "xxqc79@lhufq.-ytnym.com",
            "work": "ugcw.iardukmro@bxxtb.xdcorj.com",
            "verified": -1
        },
        "tel": {
            "home": 3765079926,
            "work": "516-379-2531",
            "mobile": {
                "personal": "(585) 492-1804",
                "work": "809-700-3477"
            }
        },
        "name": {
            "first": "Clifford",
            "last": "Zhang",
            "user": "Cari"
        },
        "creditcard": {
            "type": "Mastercard",
            "number": 373295663276405
        },
        "customer_type": "Free"
    },
    {
        "_id": "588f2ca04082b376743479e8",
        "customer_id": 4,
        "account_id": 10003,
        "field_title": "Accounting",
        "gender": "Male",
        "birth_date": "1979-05-10",
        "customer_status": 0,
        "failed_attempts": 6,
        "website_work": "dvtxzm.bikahbqu@example.com",
        "balance": -82802,
        "bonus_points": 484,
        "date_joined": "2001-07-14",
        "date_lastvisit": "1958-04-11",
        "address": {
            "line1": "821 Cowley Freeway",
            "line2": "69 East Fabien Parkway",
            "town": "Littlehampton",
            "city": "Brighton",
            "state": "Wisconsin",
            "country": "Congo",
            "zipcode": 4601
        },
        "deliveraddress": {
            "line1": "674 Rocky Hague Road",
            "line2": "40 Green Nobel Way",
            "town": "Augher",
            "city": "Nashville",
            "state": "Mississippi",
            "country": "Oman",
            "zipcode": 9048
        },
        "company": {
            "name": "Vardudazz Direct Inc",
            "number": 42540
        },
        "email": {
            "home": "oymkvp.azehgd@lgdkxq.org",
            "work": "appl.pqsuay@jzld.xmjkbs.net",
            "verified": -1
        },
        "tel": {
            "home": "186457-0886",
            "work": 5878291195,
            "mobile": {
                "personal": "(648) 896-9186",
                "work": "132-907-6309"
            }
        },
        "name": {
            "first": "Lori",
            "last": "Avery",
            "user": "Colleen930"
        },
        "creditcard": {
            "type": "Mastercard",
            "number": 4466899255300786
        },
        "customer_type": "Super"
    },
    {
        "_id": "588f2ca04082b376743479e9",
        "customer_id": 5,
        "account_id": 10004,
        "field_title": "Corporate Customer",
        "gender": "Female",
        "birth_date": "1967-10-26",
        "customer_status": 0,
        "failed_attempts": 1,
        "website_work": "ckosbybe.bpxiweq@example.com",
        "balance": -95180,
        "bonus_points": 919,
        "date_joined": "1997-10-08",
        "date_lastvisit": "1967-08-08",
        "address": {
            "line1": "22 Cowley Avenue",
            "line2": "98 White Oak Drive",
            "town": "Lee-on-Solent",
            "city": "St Helens",
            "state": "Michigan",
            "country": "Tajikistan",
            "zipcode": 3994
        },
        "deliveraddress": {
            "line1": "945 Rocky Cowley Drive",
            "line2": "25 Cowley Freeway",
            "town": "Ottery St. Mary",
            "city": "San Francisco",
            "state": "New Jersey",
            "country": "Argentina",
            "zipcode": 5438
        },
        "company": {
            "name": "Unsipantor WorldWide Corp.",
            "number": 45534
        },
        "email": {
            "home": "acbc.akfd@yibubs.org",
            "work": "svpqqdeu.gzue@csdbyvdd.hqlpdm.net",
            "verified": 0
        },
        "tel": {
            "home": "771-082-6369",
            "work": "594-3544715",
            "mobile": {
                "personal": "(030) 280-7166",
                "work": "(210) 410-1872"
            }
        },
        "name": {
            "first": "Andre",
            "last": "Mccann",
            "user": "Yvette19"
        },
        "creditcard": {
            "type": "VISA",
            "number": 5536249126565493
        },
        "customer_type": "Super"
    },
    {
        "_id": "588f2ca04082b376743479ea",
        "customer_id": 6,
        "account_id": 10005,
        "field_title": "Accounting",
        "gender": "Female",
        "birth_date": "1976-04-26",
        "customer_status": -1,
        "failed_attempts": 3,
        "website_work": "chmeh605@example.com",
        "balance": -12816,
        "bonus_points": 38,
        "date_joined": "1988-04-01",
        "date_lastvisit": "1981-04-25",
        "address": {
            "line1": "779 White Oak Road",
            "line2": "354 New Drive",
            "town": "Sheringham",
            "city": "Telford",
            "state": "Nevada",
            "country": "Iraq",
            "zipcode": 3601
        },
        "deliveraddress": {
            "line1": "19 First Boulevard",
            "line2": "60 Hague Parkway",
            "town": "Tycroes",
            "city": "Jackson",
            "state": "North Carolina",
            "country": "Malawi",
            "zipcode": 4656
        },
        "company": {
            "name": "Lombanamistor International Corp.",
            "number": 25068
        },
        "email": {
            "home": "bicx0@epxroj.net",
            "work": "lwvd82@deehtc.iiorfx.net",
            "verified": 0
        },
        "tel": {
            "home": 2154107926,
            "work": "923262-3107",
            "mobile": {
                "personal": "(251) 521-6113",
                "work": "(607) 239-9965"
            }
        },
        "name": {
            "first": "Tom",
            "last": "Zuniga",
            "user": "Fred"
        },
        "creditcard": {
            "type": "VISA",
            "number": 4276700144891516
        },
        "customer_type": "Super"
    },
    {
        "_id": "588f2ca04082b376743479eb",
        "customer_id": 7,
        "account_id": 10006,
        "field_title": "Accounting",
        "gender": "Male",
        "birth_date": "2004-08-14",
        "customer_status": -1,
        "failed_attempts": 6,
        "website_work": "feot268@example.com",
        "balance": 252807,
        "bonus_points": 72,
        "date_joined": "1973-11-30",
        "date_lastvisit": "1998-07-22",
        "address": {
            "line1": "63 Green Oak Blvd.",
            "line2": "37 Milton Parkway",
            "town": "Cambridge",
            "city": "Blackpool",
            "state": "Arkansas",
            "country": "Macedonia",
            "zipcode": 9739
        },
        "deliveraddress": {
            "line1": "70 White Second Avenue",
            "line2": "541 Green Old Drive",
            "town": "Eastbourne",
            "city": "Richmond",
            "state": "Hawaii",
            "country": "Niger",
            "zipcode": 1967
        },
        "company": {
            "name": "Monmunepor  Company",
            "number": 48685
        },
        "email": {
            "home": "pxbytb3@ejiekkvra.bewja-.com",
            "work": "cimteq03@byiitu.-yjaxj.com",
            "verified": -1
        },
        "tel": {
            "home": "721181-3539",
            "work": "284-2029482",
            "mobile": {
                "personal": "838-663-8523",
                "work": "357-519-3535"
            }
        },
        "name": {
            "first": "Gerald",
            "last": "Jefferson",
            "user": "Sherry08"
        },
        "creditcard": {
            "type": "Mastercard",
            "number": 4493218157475942
        },
        "customer_type": "Super"
    },
    {
        "_id": "588f2ca04082b376743479ec",
        "customer_id": 8,
        "account_id": 10007,
        "field_title": "Prepaid Customer",
        "gender": "Male",
        "birth_date": "2005-08-26",
        "customer_status": -1,
        "failed_attempts": 9,
        "website_work": "xstjyqtd.vrlomry@example.com",
        "balance": -99321,
        "bonus_points": 1006,
        "date_joined": "1953-06-08",
        "date_lastvisit": "1981-01-09",
        "address": {
            "line1": "629 South Rocky New Street",
            "line2": "11 Oak Avenue",
            "town": "Isle of Bute",
            "city": "St Helens",
            "state": "Mississippi",
            "country": "Venezuela",
            "zipcode": 5252
        },
        "deliveraddress": {
            "line1": "913 North Green Old Blvd.",
            "line2": "71 West Rocky Oak Drive",
            "town": "Wingate",
            "city": "Fresno",
            "state": "Wyoming",
            "country": "Lebanon",
            "zipcode": 9858
        },
        "company": {
            "name": "Partinazz International",
            "number": 64435
        },
        "email": {
            "home": "wizjg.fxhhz@hamzxl.gtssjm.net",
            "work": "deef.rbciozyts@mmek.fylqrm.net",
            "verified": -1
        },
        "tel": {
            "home": "188-8336657",
            "work": "114-982-9728",
            "mobile": {
                "personal": "(662) 641-0700",
                "work": "(131) 981-6160"
            }
        },
        "name": {
            "first": "Cindy",
            "last": "Parsons",
            "user": "Stacey727"
        },
        "creditcard": {
            "type": "AmEx",
            "number": 5250618518038661
        },
        "customer_type": "Super"
    },
    {
        "_id": "588f2ca04082b376743479ed",
        "customer_id": 9,
        "account_id": 10008,
        "field_title": "Technical",
        "gender": "Female",
        "birth_date": "1958-01-03",
        "customer_status": -1,
        "failed_attempts": 0,
        "website_work": "iqjwmilj@example.com",
        "balance": 84580,
        "bonus_points": 863,
        "date_joined": "1997-02-19",
        "date_lastvisit": "2003-12-10",
        "address": {
            "line1": "675 Old Way",
            "line2": "28 Green Nobel Blvd.",
            "town": "Pinner",
            "city": "Rotherham",
            "state": "West Virginia",
            "country": "Bangladesh",
            "zipcode": 2840
        },
        "deliveraddress": {
            "line1": "298 White Nobel Freeway",
            "line2": "28 Rocky Hague Way",
            "town": "Lossiemouth",
            "city": "Anchorage",
            "state": "Tennessee",
            "country": "Uruguay",
            "zipcode": 1634
        },
        "company": {
            "name": "Lomrobommicator  Group",
            "number": 67080
        },
        "email": {
            "home": "orboxnyc.vifnokavly@bcbdoo.org",
            "work": "pjuvfix43@zeuhff.org",
            "verified": 0
        },
        "tel": {
            "home": "",
            "work": "247-6388975",
            "mobile": {
                "personal": "(692) 882-3895",
                "work": "105-491-1969"
            }
        },
        "name": {
            "first": "Gail",
            "last": "Stein",
            "user": "Jerry073"
        },
        "creditcard": {
            "type": "Mastercard",
            "number": 4367878436817538
        },
        "customer_type": "Paid"
    },
    {
        "_id": "588f2ca04082b376743479ee",
        "customer_id": 10,
        "account_id": 10009,
        "field_title": "Service",
        "gender": "Male",
        "birth_date": "1985-08-02",
        "customer_status": 0,
        "failed_attempts": 4,
        "website_work": "eqot.ptvjpioca@example.com",
        "balance": 7995,
        "bonus_points": 1098,
        "date_joined": "1989-01-09",
        "date_lastvisit": "1954-04-23",
        "address": {
            "line1": "532 South Rocky New Avenue",
            "line2": "127 Green First Freeway",
            "town": "Holsworthy",
            "city": "Gloucester",
            "state": "Florida",
            "country": "Mali",
            "zipcode": 9201
        },
        "deliveraddress": {
            "line1": "254 Rocky First Drive",
            "line2": "37 South Rocky Milton St.",
            "town": "Alloa",
            "city": "Albuquerque",
            "state": "Pennsylvania",
            "country": "Botswana",
            "zipcode": 5432
        },
        "company": {
            "name": "Thruquesticator WorldWide Corp.",
            "number": 71721
        },
        "email": {
            "home": "wbcai.kldjxrwcd@fisoa.groyms.net",
            "work": "kxfkcxgt13@eecnjd.net",
            "verified": -1
        },
        "tel": {
            "home": "066-429-4008",
            "work": "879-276-3635",
            "mobile": {
                "personal": "757-953-8874",
                "work": "625-830-8957"
            }
        },
        "name": {
            "first": "Casey",
            "last": "Pope",
            "user": "Brent91"
        },
        "creditcard": {
            "type": "VISA",
            "number": 372862461684154
        },
        "customer_type": "Free"
    }
];
const data = [
    {
        id: 1,
        name: 'Honda Accord Crosstour',
        year: '2010',
        model: 'Accord Crosstour',
        make: 'Honda',
        media: 'http://media.ed.edmunds-media.com/honda/accord-crosstour/2010/oem/2010_honda_accord-crosstour_4dr-hatchback_ex-l_fq_oem_4_500.jpg',
        price: '$16,811'

    },
    {
        id: 2,
        name: 'Mercedes-Benz AMG GT Coupe',
        year: '2016',
        model: 'AMG',
        make: 'Mercedes Benz',
        media: 'http://media.ed.edmunds-media.com/mercedes-benz/amg-gt/2016/oem/2016_mercedes-benz_amg-gt_coupe_s_fq_oem_1_717.jpg',
        price: '$138,157'

    },
    {
        id: 3,
        name: 'BMW X6 SUV',
        year: '2016',
        model: 'X6',
        make: 'BMW',
        media: 'http://media.ed.edmunds-media.com/bmw/x6/2016/oem/2016_bmw_x6_4dr-suv_xdrive50i_fq_oem_1_717.jpg',
        price: '$68,999'
    },
    {
        id: 4,
        name: 'Ford Edge SUV',
        year: '2016',
        model: 'Edge',
        make: 'Ford',
        media: 'http://media.ed.edmunds-media.com/ford/edge/2016/oem/2016_ford_edge_4dr-suv_sport_fq_oem_6_717.jpg',
        price: '$36,275'
    },
    {
        id: 5,
        name: 'Dodge Viper Coupe',
        year: '2017',
        model: 'Viper',
        make: 'Dodge',
        media: 'http://media.ed.edmunds-media.com/dodge/viper/2017/oem/2017_dodge_viper_coupe_acr_fq_oem_3_717.jpg',
        price: '$123,890'
    }
];

render(
      <Router history={history}>
          <div>
            <Main>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/cars" render={(...props) => <Car {...props} data={data} />} />
              <Route path="/car/:id" render={(...props) => <CarDetail {...props} data={data} />} />
              <Route path="/customers" render={(...props) => <Customer {...props} data={userData} />} />
              <Route path="/customer/:id" render={(...props) => <CustomerDetail {...props} data={userData} />} />
            </Main>
          </div>
      </Router>,
    document.getElementById('container')
);
