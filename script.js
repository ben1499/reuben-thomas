const aboutSection = document.querySelector("#about");
const images = document.querySelectorAll(".images img");
const aboutParas = document.querySelectorAll(".about-para");
const sectionTitles = document.querySelectorAll(".section-title");
const expCards = document.querySelectorAll(".experience-card");
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav li a");
const scrollProgressBar = document.querySelector(".scroll-progress-bar");

function throttle(func, delay = 800) {
  let flag = true;
  let lastArgs = null;
  return (...args) => {
    if (flag) {
      func(...args);
      flag = false;
      setTimeout(() => {
        flag = true;
        if (lastArgs) func(...lastArgs);
        lastArgs = null;
      }, delay);
    } else {
      lastArgs = args;
    }
  };
}

const initialHeaderOffsetTop = header.offsetTop;

function onScroll() {
  // header effect on scroll
  const currentScrollY = window.scrollY;
  header.classList.toggle("fixed", currentScrollY >= initialHeaderOffsetTop);

  // scrollspy
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // const sectionHeight = section.clientHeight;
    const offset = 300;
    if (scrollY >= sectionTop - offset) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");
    }
  });
}

function handleProgressBar() {
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollY / height) * 100;
  scrollProgressBar.style.width = `${scrolled}%`;
}

const throttledOnScroll = throttle(onScroll, 400);

window.addEventListener("scroll", () => {
  throttledOnScroll();
  handleProgressBar();
});

const aboutSectionObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      images.forEach((image) => {
        image.classList.add("appear");
      });
    } else {
      // only if scrolled up out of section
      if (entry.boundingClientRect.bottom > 1200) {
        images.forEach((image) => {
          image.classList.remove("appear");
        });
      }
    }
  },
  {
    threshold: 0.2,
    rootMargin: "5px 0px 0px 0px",
  },
);

aboutSectionObserver.observe(aboutSection);

const aboutParasObserver = new IntersectionObserver(
  ([entry]) => {
    const fromTop = entry.intersectionRect.top;
    const fromBottom = entry.rootBounds.height - entry.intersectionRect.bottom;

    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
    } else {
      // only if scrolled up out of section
      if (fromTop > fromBottom) {
        entry.target.classList.remove("appear");
      }
    }
  },
  { threshold: [0.5, 0.8] },
);

const sectionTitleObserver = new IntersectionObserver(
  ([entry]) => {
    // console.log("observe", entry.isIntersecting);
    const fromTop = entry.intersectionRect.top;
    const fromBottom = entry.rootBounds.height - entry.intersectionRect.bottom;

    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
    } else {
      // only if scrolled up out of section
      if (fromTop > fromBottom) {
        entry.target.classList.remove("appear");
      }
    }
  },
  { threshold: [0.4, 0.8] },
);

const expCardsObserver = new IntersectionObserver(
  ([entry]) => {
    const fromTop = entry.intersectionRect.top;
    const fromBottom = entry.rootBounds.height - entry.intersectionRect.bottom;

    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
    } else {
      // only if scrolled up out of section
      if (fromTop > fromBottom) {
        entry.target.classList.remove("appear");
      }
    }
  },
  { threshold: [0.6, 0.8] },
);

const checkInitialVisibility = () => {
  sectionTitles.forEach((title) => {
    // Observe the element
    sectionTitleObserver.observe(title);

    // Check if element is already in view on page load
    const rect = title.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top >= 0 && rect.bottom <= viewportHeight) {
      title.classList.add("appear");
    }
  });

  aboutParas.forEach((para) => {
    // Observe the element
    aboutParasObserver.observe(para);

    // Check if element is already in view on page load
    const rect = para.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top >= 0 && rect.bottom <= viewportHeight) {
      para.classList.add("appear");
    }
  });

  expCards.forEach((card) => {
    // Observe the element
    expCardsObserver.observe(card);

    // Check if element is already in view on page load
    const rect = card.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top >= 0 && rect.bottom <= viewportHeight) {
      card.classList.add("appear");
    }
  });
};

checkInitialVisibility();

for (let i = 1; i <= 5; i++) {
  const projectCards = document.querySelectorAll(
    `.project-card:nth-child(${i}n)`,
  );
  projectCards.forEach((el) => {
    el.style.top = `${i * 130}px`;
  });
}

const words = document.querySelectorAll(".word-swap");
let current = 0;

// Immediately show the first word on load
words[current].classList.add("visible");

setInterval(() => {
  words[current].classList.remove("visible");

  setTimeout(() => {
    current = (current + 1) % words.length;
    words[current].classList.add("visible");
  }, 500);
}, 1500);

tippy(".tooltip.react", {
  content: "React",
});

tippy(".tooltip.node", {
  content: "Node.js",
});

tippy(".tooltip.express", {
  content: "Express.js",
});

tippy(".tooltip.postgres", {
  content: "PostgreSQL",
});

tippy(".tooltip.prisma", {
  content: "Prisma",
});

tippy(".tooltip.mongodb", {
  content: "MongoDB",
});
