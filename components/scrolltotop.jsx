"use client";
import { useEffect } from "react";
import { HiArrowSmUp } from "react-icons/hi";

export default function ScrollToTop() {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const handleScroll = () => {
  //   const position = window.pageYOffset;
  //   setScrollPosition(position);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    let mybutton = document.getElementById("myBtn");
    window.onscroll = function () {
      scrollFunction();
    };
    function scrollFunction() {
      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }, []);

  const BackToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <button
        id="myBtn"
        className={`group hidden fixed slide-top -bottom-10 right-8 drop-shadow-2xl p-3 rounded-[10px] border border-primary hover:border-primary bg-primary transition duration-300 scale-90 hover:bg-white`}
        onClick={() => BackToTop()}
      >
        <HiArrowSmUp className="text-white group-hover:text-primary text-h6 " />
      </button>
    </div>
  );
}
