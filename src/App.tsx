/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useRef, useState} from "react";
import {
  BsFillCreditCard2BackFill,
  BsFillGrid3X3GapFill,
  BsSim,
  BsWifi,
} from "react-icons/bs";
import {IoClose} from "react-icons/io5";
import {TfiWallet} from "react-icons/tfi";
import {AiOutlineEdit} from "react-icons/ai";
import "./App.css";

function App() {
  const [bankNumber, setBankNumber] = useState(""); //State for bank input
  const [mm, setMM] = useState(""); // State for month input
  const [yy, setYY] = useState(""); // State for year input
  const [ccvNumber, setCCVNumber] = useState(""); // State for cvv input
  const [password, setPassword] = useState(""); // state for password input
  const [openCard, setOpenCard] = useState(false); // state to check if the form card is open
  const cardRef: React.MutableRefObject<any> = useRef(); // ref to the form card
  const [bankNumbercontainsLetters, settBankNumberContainsLetters] =
    useState(false); //State to check if bank input contains letters
  const [mmCheck, setMMCheck] = useState(false); // state to check if if the month input contains a number higher than 12 (months in the year)
  const [ccvNumbercontainsLetters, setCCVNumberContainsLetters] =
    useState(false); // state to check if the ccv input contains letters
  const [ccvNumberlength, setCCVNumberLength] = useState(false); // state to check if the ccv input contains more than 3 numbers
  const [passwordUpperCase, setPasswordUpperCase] = useState(false); // State to check if the password contains an upper case letter
  const [passwordLowerCase, setPasswordLowerCase] = useState(false); // State to check if the password contains a lower case letter
  const [passwordNumber, setPasswordNumber] = useState(false); // State to check if the password contains a number
  const [passwordChar, setPasswordChar] = useState(false); // State to check if the password contains a special character
  const handleNumberChange = (e: {target: {value: string}}) => {
    const input1 = e.target.value;
    const regex = /[a-zA-Z]/; // Regular expression to match any letter

    if (regex.test(input1)) {
      settBankNumberContainsLetters(true);
    } else {
      settBankNumberContainsLetters(false);
    }
    const input = input1.replace(/\D/g, ""); // Remove non-digit characters

    // Format the value as per your desired format
    let formatted = "";
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += "-";
      }
      formatted += input[i];
    }
    //   setting state to only contain the required letters
    setBankNumber(formatted.slice(0, 19));
  };
  const handleCvvChange = (e: {target: {value: string}}) => {
    const input1 = e.target.value;
    const regex = /[a-zA-Z]/; // Regular expression to match any letter

    if (regex.test(input1)) {
      setCCVNumberContainsLetters(true);
      setTimeout(() => setCCVNumberContainsLetters(false), 1000);
    } else {
      setCCVNumberContainsLetters(false);
    }
    if (input1.length > 3) {
      setCCVNumberLength(true);
      setTimeout(() => setCCVNumberLength(false), 1000);
    }
    const input = input1.replace(/\D/g, ""); // Remove non-digit characters
    setCCVNumber(input.slice(0, 3)); // Set state to nothing more than 3 numbers
  };
  const handleMMChange = (e: {target: {value: string}}) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 2);
    if (Number(input) > 12) {
      setMMCheck(true);
      setTimeout(() => setMMCheck(false), 1000);
    } else {
      setMMCheck(false);
      setMM(input);
    }
  };
  const handleYYChange = (e: {target: {value: string}}) => {
    const input = e.target.value.replace(/\D/g, "");
    setYY(input.slice(0, 2));
  };
  const handlePassword = (e: {target: {value: string}}) => {
    const input = e.target.value;

    // Check if the password meets the requirements
    const hasUppercase = /[A-Z]/.test(input);
    const hasLowercase = /[a-z]/.test(input);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(input);
    const hasNumber = /[0-9]/.test(input);
    if (!hasUppercase) {
      setPasswordUpperCase(true);
    } else {
      setPasswordUpperCase(false);
    }
    if (!hasLowercase) {
      setPasswordLowerCase(true);
    } else {
      setPasswordLowerCase(false);
    }
    if (!hasSpecialChar) {
      setPasswordChar(true);
    } else {
      setPasswordChar(false);
    }
    if (!hasNumber) {
      setPasswordNumber(true);
    } else {
      setPasswordNumber(false);
    }
    setPassword(input);
  };

  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    const newBankNumber = bankNumber.split("-").join(""); // Considering a hyphen "-" was added after every 4 numbers we remove it now to be able to submit the form
    console.log(newBankNumber, bankNumber, password);
  };
  const handleOpenCard = () => {
    setOpenCard(true);
    setTimeout(() => {
      setOpenCard(false);
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (e: {target: any}) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        handleOpenCard();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <section
      className={`flex justify-center bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 items-center lg:p-8 min-h-screen `}
    >
      <div
        ref={cardRef}
        className={`bg-white flex h-screen lg:h-full justify-center gap-4 flex-col items-center lg:border lg:rounded-md lg:shadow-md w-full p-4 md:p-8 max-w-[80rem] relative ${
          openCard ? "opacity-0 -top-10" : "opacity-1 top-0"
        } transition-all duration-300`}
      >
        <div className={`justify-end flex  items-end text-3xl w-full `}>
          <div
            onClick={handleOpenCard}
            className={`flex justify-start items-center border border-gray-00 w-8 rounded-md text-gray-600 h-8 cursor-pointer`}
          >
            <IoClose />
          </div>
        </div>
        <div className={`w-full lg:grid lg:grid-cols-[2fr_1fr]  gap-2 `}>
          <div
            className={`w-full flex justify-between gap-6 sm:gap-8  flex-col items-center`}
          >
            <div className={`flex justify-between items-center w-full`}>
              <div className={`flex justify-center text-xl items-center gap-2`}>
                <div
                  className={`p-3 rounded-full lg:text-2xl sm:text-xl text-lg text-white bg-blue-800`}
                >
                  <BsFillCreditCard2BackFill />{" "}
                </div>
                <p className={`font-semibold`}>
                  AceCoin<span className={`font-normal`}>Pay</span>
                </p>
              </div>
              <div
                className={`flex justify-center text-sm sm:text-md items-center gap-1`}
              >
                <div
                  className={`w-8 h-8 text-white bg-blue-800 flex justify-center items-center rounded-sm`}
                >
                  <span className="translate-y-[1px]">1</span>
                </div>
                <div
                  className={`w-8 h-8 text-white bg-blue-800 flex justify-center items-center rounded-sm`}
                >
                  <span className="translate-y-[1px]">2</span>
                </div>
                <div className={`text-3xl`}>:</div>
                <div
                  className={`w-8 h-8 text-white bg-blue-800 flex justify-center items-center rounded-sm`}
                >
                  <span className="translate-y-[1px]">3</span>
                </div>
                <div
                  className={`w-8 h-8 text-white bg-blue-800 flex justify-center items-center rounded-sm`}
                >
                  <span className="translate-y-[1px]">4</span>
                </div>
              </div>
            </div>
            <form
              action=""
              onSubmit={handleSubmit}
              className={`flex justify-center gap-4 flex-col items-center w-full`}
            >
              <div
                className={`flex flex-col justify-between items-center w-full gap-1`}
              >
                <div className={`flex justify-between items-center w-full `}>
                  <div className={`flex flex-col justify-start`}>
                    <p className={`text-sm`}>CCV Number</p>
                    <p className={`text-xs text-gray-600`}>
                      Enter 3 or 4 number in this card
                    </p>
                  </div>

                  <div
                    className={`flex justify-start items-center gap-2 text-sm transition-all text-blue-600 p-2 px-3 rounded-md hover:bg-blue-800 hover:text-white cursor-pointer`}
                  >
                    <AiOutlineEdit />
                    <p>Edit</p>
                  </div>
                </div>
                <div
                  className={`flex justify-between items-center border focus-within:border-blue-700 transition-all w-full rounded-md p-2 gap-2`}
                >
                  <div
                    className={`w-8 h-8 flex justify-between items-center text-2xl`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="mastercard"
                    >
                      <path
                        fill="#FF5F00"
                        d="M15.245 17.831h-6.49V6.168h6.49v11.663z"
                      ></path>
                      <path
                        fill="#EB001B"
                        d="M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999 5.831A7.406 7.406 0 0 1 9.167 12z"
                      ></path>
                      <path
                        fill="#F79E1B"
                        d="M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527 12 6.169A7.417 7.417 0 0 1 24 12z"
                      ></path>
                    </svg>
                  </div>

                  <input
                    className=" w-full p-1 text-sm rounded-md outline-none"
                    type="text"
                    name=""
                    id=""
                    required
                    placeholder="1234-4567-7894-4568"
                    value={bankNumber}
                    onChange={handleNumberChange}
                  />
                  <div
                    className={`w-8 h-8 flex justify-between items-center  text-2xl`}
                  >
                    <img
                      src={`/check-mark.png`}
                      width={100}
                      height={100}
                      alt={``}
                    />
                  </div>
                </div>
                <div
                  className={`overflow-hidden  ${
                    bankNumbercontainsLetters ? "h-4" : "h-0"
                  } transition-all`}
                >
                  <p
                    className={`text-xs text-red-800 transition-all ${
                      bankNumbercontainsLetters ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    *input cannot contain letters*
                  </p>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 justify-between items-center w-full gap-1`}
              >
                <div className={`flex justify-start items-center w-full`}>
                  <div className={`flex flex-col justify-start`}>
                    <p className={`text-sm`}>CCV Number</p>
                    <p className={`text-xs text-gray-600`}>
                      Enter 3 or 4 number in this card
                    </p>
                  </div>
                </div>
                <div
                  className={`flex focus-within:border-blue-700 transition-all justify-between items-center border w-full rounded-md p-2 gap-2`}
                >
                  <input
                    className=" w-full p-1 text-sm text-center rounded-md outline-none"
                    type="text"
                    name=""
                    id=""
                    required
                    placeholder="123"
                    value={ccvNumber}
                    onChange={handleCvvChange}
                  />
                  <div
                    className={`w-8 h-8 flex justify-center items-center text-2xl text-gray-500 cursor-pointer`}
                  >
                    <BsFillGrid3X3GapFill />
                  </div>
                </div>
                <div className={`lg:col-span-2 lg:col-start-2`}>
                  <div
                    className={`overflow-hidden   ${
                      ccvNumbercontainsLetters ? "h-4" : "h-0"
                    } transition-all`}
                  >
                    <p
                      className={`text-xs text-red-800 transition-all ${
                        ccvNumbercontainsLetters ? "opacity-1" : "opacity-0"
                      }`}
                    >
                      *input cannot contain letters*
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden   ${
                      ccvNumberlength ? "h-4" : "h-0"
                    } transition-all`}
                  >
                    <p
                      className={`text-xs text-red-800 transition-all ${
                        ccvNumberlength ? "opacity-1" : "opacity-0"
                      }`}
                    >
                      *input cannot contain more than 3 numbers*
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 justify-between items-center w-full gap-1`}
              >
                <div className={`flex justify-start items-center w-full`}>
                  <div className={`flex flex-col justify-start`}>
                    <p className={`text-sm`}>Expiry Date</p>
                    <p className={`text-xs text-gray-600`}>
                      Enter the expiration date of this card
                    </p>
                  </div>
                </div>
                <div
                  className={`flex  transition-all justify-between items-center  w-full rounded-md gap-2`}
                >
                  <input
                    className=" w-full text-sm text-center rounded-md outline-none p-3 border focus-within:border-blue-700"
                    type="text"
                    name=""
                    required
                    id=""
                    placeholder="MM"
                    value={mm}
                    onChange={handleMMChange}
                  />
                  <div>/</div>
                  <input
                    className=" w-full text-sm text-center rounded-md outline-none p-3 border focus-within:border-blue-700"
                    type="text"
                    name=""
                    required
                    id=""
                    placeholder="YY"
                    value={yy}
                    onChange={handleYYChange}
                  />
                </div>
                <div
                  className={`overflow-hidden  lg:col-span-2 lg:col-start-2 ${
                    mmCheck ? "h-4" : "h-0"
                  } transition-all`}
                >
                  <p
                    className={`text-xs text-red-800 transition-all ${
                      mmCheck ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    *make sure your input is not more than 12*
                  </p>
                </div>
              </div>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 justify-between items-center w-full gap-1`}
              >
                <div className={`flex justify-start items-center w-full`}>
                  <div className={`flex flex-col justify-start`}>
                    <p className={`text-sm`}>Password</p>
                    <p className={`text-xs text-gray-600`}>
                      Enter your dynamic password
                    </p>
                  </div>
                </div>
                <div
                  className={`flex focus-within:border-blue-700 transition-all justify-between items-center border w-full rounded-md p-2 gap-2`}
                >
                  <input
                    className=" w-full p-1 text-sm text-center rounded-md outline-none"
                    type="password"
                    name=""
                    id=""
                    required
                    placeholder="********"
                    value={password}
                    onChange={handlePassword}
                  />
                  <div
                    className={`w-8 h-8 flex justify-center items-center text-2xl text-gray-500 cursor-pointer`}
                  >
                    <BsFillGrid3X3GapFill />
                  </div>
                </div>
                <div className={`lg:col-span-2 lg:col-start-2`}>
                  <div
                    className={`overflow-hidden  ${
                      passwordUpperCase ? "h-4" : "h-0"
                    } transition-all`}
                  >
                    <p
                      className={`text-xs text-red-800 transition-all ${
                        passwordUpperCase ? "opacity-1" : "opacity-0"
                      }`}
                    >
                      *password must contain capital letters*
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden  ${
                      passwordNumber ? "h-4" : "h-0"
                    } transition-all `}
                  >
                    <p
                      className={`text-xs text-red-800 transition-all ${
                        passwordNumber ? "opacity-1" : "opacity-0"
                      }`}
                    >
                      *password must contain numbers*
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden  ${
                      passwordChar ? "h-4" : "h-0"
                    } transition-all`}
                  >
                    <p
                      className={`text-xs text-red-800 transition-all ${
                        passwordChar ? "opacity-1" : "opacity-0"
                      }`}
                    >
                      *password must contain special characters like "@#$%^&"*
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden  ${
                      passwordLowerCase ? "h-4" : "h-0"
                    } transition-all`}
                  >
                    <p
                      className={`text-xs text-red-800 transition-all ${
                        passwordLowerCase ? "opacity-1" : "opacity-0"
                      }`}
                    >
                      *password must contain small letters*
                    </p>
                  </div>
                </div>
              </div>
              <button
                className={`flex w-full p-3 px-4 bg-blue-800 text-white justify-center font-semibold cursor-pointer rounded-md hover:bg-blue-600 transition-all`}
              >
                PAY NOW
              </button>
            </form>
          </div>
          <div
            className={`w-full justify-start bg-transparent items-center hidden lg:flex flex-col  overflow-hidden`}
          >
            <div
              className={`w-72 rounded-lg pb-8 justify-start bg-transparent items-center flex flex-col p-2 gap-2 overflow-hidden relative  before:content-[''] before:absolute before:bg-gray-100 before:w-full before:h-full before:top-[6rem] before:left-0 before:-z-8  before:rounded-lg`}
            >
              <div
                className={`w-full justify-start items-center flex flex-col z-40 `}
              >
                <div
                  className={`flex justify-between items-center flex-col bg-white shadow-md border border-gray-100 p-5 h-72 w-56 rounded-md`}
                >
                  <div
                    className={`flex w-full justify-between items-center  text-gray-500`}
                  >
                    <BsSim fontSize={30} />
                    <BsWifi fontSize={30} />
                  </div>
                  <div
                    className={`w-full text-sm flex gap-1 flex-col justify-between items-center`}
                  >
                    <div className={`flex justify-start items-center w-full`}>
                      <p>Idris Agboola</p>
                    </div>
                    <div className={`flex justify-start items-center w-full`}>
                      <p>&bull;&bull;&bull;&bull; 9826</p>
                    </div>
                    <div className={`flex justify-between items-center w-full`}>
                      <p>09/20</p>
                      <div
                        className={`w-8 h-8 flex justify-between items-center text-2xl`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          id="mastercard"
                        >
                          <path
                            fill="#FF5F00"
                            d="M15.245 17.831h-6.49V6.168h6.49v11.663z"
                          ></path>
                          <path
                            fill="#EB001B"
                            d="M9.167 12A7.404 7.404 0 0 1 12 6.169 7.417 7.417 0 0 0 0 12a7.417 7.417 0 0 0 11.999 5.831A7.406 7.406 0 0 1 9.167 12z"
                          ></path>
                          <path
                            fill="#F79E1B"
                            d="M24 12a7.417 7.417 0 0 1-12 5.831c1.725-1.358 2.833-3.465 2.833-5.831S13.725 7.527 12 6.169A7.417 7.417 0 0 1 24 12z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`justify-between items-center text-sm flex flex-col gap-3 w-full p-2 z-20`}
              >
                <div
                  className={`justify-between items-center text-sm flex gap-1 w-60 px-2 font-semibold`}
                >
                  <p className={`text-gray-600 `}>Company</p>
                  <p className={`text-blue-800`}>Apple</p>
                </div>
                <div
                  className={`justify-between items-center text-sm flex gap-1 w-60 px-2 font-semibold`}
                >
                  <p className={`text-gray-600`}>Order Number</p>
                  <p className={`text-blue-800`}>09825</p>
                </div>
                <div
                  className={`justify-between items-center text-sm flex gap-1 w-60 px-2 font-semibold`}
                >
                  <p className={`text-gray-600`}>Product</p>
                  <p className={`text-blue-800`}>Macbook Air</p>
                </div>
              </div>
              <div
                className={`h-8 w-full z-20 relative before:content-[""] before:absolute before:-bottom-1 before:-left-8 before:w-12 before:h-12 before:bg-white before:rounded-full after:content-[""] after:absolute after:-bottom-1 after:-right-8 after:w-12 after:h-12 after:bg-white after:rounded-full`}
              >
                <svg
                  height="20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{width: "100%"}}
                >
                  <line
                    stroke-dasharray="5, 5"
                    x1="0"
                    y1="13"
                    x2="600"
                    y2="11"
                    style={{strokeWidth: "2px", stroke: "rgba(0,0,0,0.4)"}}
                  ></line>
                </svg>
              </div>

              <div
                className={`justify-between items-center text-sm flex flex-col gap-2 w-full p-2 z-20`}
              >
                <div
                  className={`flex justify-between items-center text-sm gap-1 w-60 px-2`}
                >
                  <p className={`text-gray-600`}>You have to pay</p>
                  <div
                    className={`text-blue-800 flex justify-between items-center text-md`}
                  >
                    <TfiWallet fontSize={22} />
                  </div>
                </div>
                <div
                  className={`flex justify-start items-center text-sm gap-1 w-60 px-2`}
                >
                  <div
                    className={`text-blue-800 flex justify-center items-center gap-2`}
                  >
                    <span className={`font-semibold text-2xl`}>
                      549<span className={`text-sm font-normal`}>.99</span>
                    </span>
                    <span className={`text-sm font-normal`}>USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
