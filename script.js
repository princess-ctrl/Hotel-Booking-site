'use strict';

// Select the toggle icon and the navbar
const navbarToggle = document.querySelector('.navbar__toggle i');
const navbar = document.querySelector('.navbar');

// Add an event listener to the toggle icon
navbarToggle.addEventListener('click', () => {
  // Toggle the navbar open class
  navbar.classList.toggle('open');

  // Toggle the icon between fa-bars and fa-times
  if (navbar.classList.contains('open')) {
    navbarToggle.classList.remove('fa-bars'); // Remove fa-bars
    navbarToggle.classList.add('fa-times'); // Add fa-times
  } else {
    navbarToggle.classList.remove('fa-times'); // Remove fa-times
    navbarToggle.classList.add('fa-bars'); // Add fa-bars
  }
});

document.addEventListener('DOMContentLoaded', function () {
  AOS.init();

  const rooms = document.querySelectorAll('.room');
  const bookRoomForm = document.querySelector('#booking-form');
  const fullNameInput = document.querySelector('#name');
  const checkInInput = document.querySelector('#check-in');
  const checkOutInput = document.querySelector('#check-out');
  const emailInput = document.querySelector('#email');
  const guestsInput = document.querySelector('#guests');
  const successMessage = document.querySelector('#success_msg');

  // BOOKING FUNCTIONALITY
  rooms.forEach(room => {
    room.addEventListener('click', function () {
      const roomName = room.querySelector('.room_name').textContent;
      const roomPrice = room.querySelector('.room_price').textContent;
      // STORE ROOM DETAILS IN LOCALSTORAGE
      localStorage.setItem('roomName', roomName);
      localStorage.setItem('roomPrice', roomPrice);

      window.open('book.html', '_self');
    });
  });

  if (window.location.href.includes('book.html')) {
    const roomName = localStorage.getItem('roomName');
    const roomPrice = localStorage.getItem('roomPrice');

    document.querySelector('.booking__text h1').innerText = `Book ${roomName}`;
    document.querySelector(
      '.booking__text p'
    ).innerText = `Price: ${roomPrice}`;
  }

  // Check in and check out date
  const today = new Date();
  checkInInput.min = today.toISOString().split('T')[0];

  checkInInput.addEventListener('input', function () {
    checkOutInput.min = checkInInput.value;
  });

  // Validating the Booking form
  if (bookRoomForm) {
    // Check if bookRoomForm exists
    bookRoomForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const fullName = fullNameInput.value;
      const email = emailInput.value;
      const checkIn = checkInInput.value;
      const checkOut = checkOutInput.value;
      const guests = guestsInput.value;

      // Display success message
      successMessage.style.display = 'block';
      successMessage.innerText = 'Booking Confirmed!';

      // Hide success message after 3 seconds
      setTimeout(() => {
        successMessage.style.display = 'none';
        bookRoomForm.reset();
      }, 3000);
    });
  }
});

// JQUERY LIBRARY
$(document).ready(function () {
  $('.showcase__fade').slick({
    dots: true,
    infinite: true,
    autoplaySpeed: 4000,
    autoplay: true,
    fade: true,
    fadeSpeed: 1000,
    cssEase: 'linear',
  });

  $('.autoplay').slick({
    slidesToShow: 3, // Desktop view
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // Show arrows on desktop
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2, // 2 slides on tablet
          arrows: false, // Hide arrows on tablet
        },
      },
      {
        breakpoint: 785, // Mobile
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          arrows: false, // Hide arrows on mobile
        },
      },
    ],
  });
});
