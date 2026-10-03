/* ==========================================================================
   Narmada Hospital (Maa Narmada Multi Speciality Hospital) - JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    
    /* ----------------------------------------------------------------------
       1. Mobile Navigation Toggle
       ---------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerIcon = hamburger ? hamburger.querySelector('i') : null;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('open');
            if (hamburgerIcon) {
                if (navMenu.classList.contains('open')) {
                    hamburgerIcon.classList.remove('fa-bars');
                    hamburgerIcon.classList.add('fa-xmark');
                } else {
                    hamburgerIcon.classList.remove('fa-xmark');
                    hamburgerIcon.classList.add('fa-bars');
                }
            }
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    if (hamburgerIcon) {
                        hamburgerIcon.classList.remove('fa-xmark');
                        hamburgerIcon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. Active Section Highlighting on Scroll
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        const scrollY = window.pageYOffset;
        sections.forEach(function (current) {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector('.nav-link[href*="' + sectionId + '"]');

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    });

    /* ----------------------------------------------------------------------
       3. Contact Appointment Form Handler
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-appointment-form');
    const contactName = document.getElementById('contact-name');
    const contactPhone = document.getElementById('contact-phone');
    const contactDate = document.getElementById('contact-date');
    const contactMsgBox = document.getElementById('contact-form-message');

    // Set min date to today
    if (contactDate) {
        const today = new Date().toISOString().split('T')[0];
        contactDate.setAttribute('min', today);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            let isValid = true;
            const nameVal = contactName ? contactName.value.trim() : '';
            const phoneVal = contactPhone ? contactPhone.value.trim().replace(/\D/g, '') : '';
            const dateVal = contactDate ? contactDate.value : '';

            // Name validation
            if (!nameVal) {
                showInputError(contactName);
                isValid = false;
            } else {
                clearInputError(contactName);
            }

            // Phone validation
            if (!phoneVal || phoneVal.length < 10) {
                showInputError(contactPhone);
                isValid = false;
            } else {
                clearInputError(contactPhone);
            }

            // Date validation
            if (!dateVal) {
                showInputError(contactDate);
                isValid = false;
            } else {
                clearInputError(contactDate);
            }

            if (isValid) {
                // Plain text only — no emojis to avoid rendering issues on WhatsApp
                var message =
                    'Narmada Hospital\n' +
                    'Appointment Request\n\n' +
                    'Patient: '        + nameVal  + '\n' +
                    'Phone: '          + phoneVal + '\n' +
                    'Preferred Date: ' + dateVal  + '\n\n' +
                    'Please confirm my appointment. Thank you.';

                var waUrl = 'https://wa.me/919039502411?text=' + encodeURIComponent(message);

                contactForm.reset();
                if (contactMsgBox) {
                    contactMsgBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you <strong>' + nameVal + '</strong>! Opening WhatsApp to send your booking...';
                    contactMsgBox.style.display = 'block';

                    setTimeout(function () {
                        contactMsgBox.style.display = 'none';
                    }, 6000);
                }

                window.open(waUrl, '_blank');
            }
        });
    }

    function showInputError(elem) {
        if (elem) {
            elem.style.borderColor = '#dc2626';
            elem.style.backgroundColor = '#fef2f2';
        }
    }

    function clearInputError(elem) {
        if (elem) {
            elem.style.borderColor = '#cbd5e1';
            elem.style.backgroundColor = '#ffffff';
        }
    }

    /* ----------------------------------------------------------------------
       4. Gallery Lightbox Modal Popup Handler
       ---------------------------------------------------------------------- */
    const galleryCards = document.querySelectorAll('.gallery-card');
    const galleryModal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.getElementById('modal-close');

    if (galleryCards && galleryModal && modalImg) {
        galleryCards.forEach(function (card) {
            card.addEventListener('click', function () {
                const imgSrc = this.getAttribute('data-img');
                const titleText = this.getAttribute('data-title');

                if (imgSrc) {
                    modalImg.src = imgSrc;
                    if (modalCaption) {
                        modalCaption.textContent = titleText || '';
                    }
                    galleryModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        galleryModal.addEventListener('click', function (e) {
            if (e.target === galleryModal || e.target === modalClose) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && galleryModal.style.display === 'flex') {
                closeModal();
            }
        });

        function closeModal() {
            galleryModal.style.display = 'none';
            modalImg.src = '';
            document.body.style.overflow = '';
        }
    }

    /* ----------------------------------------------------------------------
       5. View More Gallery Photos Toggle
       ---------------------------------------------------------------------- */
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (viewMoreBtn) {
        let isExpanded = false;
        viewMoreBtn.addEventListener('click', function () {
            const hiddenCards = document.querySelectorAll('.gallery-card-hidden, .gallery-card-shown');
            isExpanded = !isExpanded;
            
            hiddenCards.forEach(function (card) {
                if (isExpanded) {
                    card.classList.remove('gallery-card-hidden');
                    card.classList.add('gallery-card-shown');
                } else {
                    card.classList.remove('gallery-card-shown');
                    card.classList.add('gallery-card-hidden');
                }
            });

            if (isExpanded) {
                viewMoreBtn.innerHTML = 'View Less Photos <i class="fa-solid fa-chevron-up" style="margin-left: 6px;"></i>';
            } else {
                viewMoreBtn.innerHTML = 'View More Photos <i class="fa-solid fa-chevron-down" style="margin-left: 6px;"></i>';
            }
        });
    }
});
