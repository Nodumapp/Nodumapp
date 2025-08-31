// src/pages/Home.jsx
import { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";


// Imágenes
import logo from "../assets/images/Nodum Logo solo color sin slogan.png";
import logoFooter from "../assets/images/Nodum negro.png";
import img1 from "../assets/images/undraw_visionary-technology_f6b3.png";
import img2 from "../assets/images/undraw_app-dark-mode_6ji2.png";
import img3 from "../assets/images/undraw_booking_1ztt.png";
import img4 from "../assets/images/undraw_remote-worker_0l91.png";

export default function Home() {
    useEffect(() => {
        // --- Estado "manual" dentro del efecto (se reinicia limpio por StrictMode y está OK)
        let currentLang = "es";
        let currentPeriod = "mensual";

        const translations = {
            es: {
                nav_home: "Inicio",
                nav_solutions: "Soluciones",
                nav_plans: "Planes",
                nav_faq: "FAQs",
                btn_register: "Registrarme",
                btn_login: "Ingresar",
                hero_title:
                    "Activá tus procesos.<br>Sin <span class='highlight'>pedir permiso.</span>",
                hero_subtitle:
                    "La plataforma autogestionada para empresas que quieren simplificar, escalar y dejar de depender de terceros.",
                plans_title: "Planes simples y diseñados para crecer con tu empresa.",
                plans_desc:
                    "Elegí el módulo o plan que se ajuste a tus necesidades. Activación inmediata sin contratos ni costos ocultos.",
                btn_monthly: "Mensual",
                btn_yearly: "Anual",
                save_desc: "Ahorra <span>35%</span>",
                plan_basic: "Básico",
                plan_basic_desc:
                    "Ideal para empresas que quieren empezar a digitalizar procesos...",
                plan_pro: "Pro",
                plan_pro_desc:
                    "Para empresas que necesitan más potencia, flexibilidad y herramientas.",
                plan_enterprise: "Empresarial",
                plan_enterprise_desc: "La experiencia completa de Nodum...",
                btn_select_plan: "Seleccionar plan",
                btn_selected: "Seleccionado",
                label_popular: "Popular",
                ecosystem_title:
                    "Un ecosistema de soluciones activables según tu necesidad.",
                ecosystem_desc:
                    "En Nodum, cada modulo es una herramienta independiente que podés activar cuando lo necesitás. Sin intermediarios, sin integraciones complejas, sin esperar permisos.",
                features_title: "Características",
                plan_basic_feat1: "1 módulo activo",
                plan_basic_feat2: "Hasta 3 usuarios",
                plan_basic_feat3: "Soporte por correo electrónico",
                plan_basic_feat4: "Acceso a actualizaciones básicas",
                plan_basic_feat5: "Panel de control centralizado",
                plan_pro_feat1: "Hasta 5 módulos activos",
                plan_pro_feat2: "Incluye 10 usuarios",
                plan_pro_feat3: "Exportación de datos e informes",
                plan_pro_feat4: "Soporte prioritario por chat y correo electrónico",
                plan_pro_feat5: "Personalización básica de la interfaz",
                plan_enterprise_feat1: "Módulos ilimitados",
                plan_enterprise_feat2: "Usuarios ilimitados",
                plan_enterprise_feat3: "Soporte 24/7 con gerente de cuenta dedicado",
                plan_enterprise_feat4: "Onboarding y capacitación in company",
                plan_enterprise_feat5: "Exportaciones programadas: envío automático de informes por email",
                faq_title: "Preguntas Frecuentes (FAQ)",
                faq_subtitle: "Todo lo que tenés que saber para empezar",
                faq1_q: "¿Qué es Nodum y cómo funciona?",
                faq1_a:
                    "Nodum es una plataforma online que reúne diferentes herramientas para que tu empresa trabaje de forma más simple, rápida y sin depender de terceros.<br>Podés activar solo las funciones que necesitás y, si querés, conectarlas entre sí.",
                faq2_q: "¿Necesito conocimientos técnicos para usar Nodum?",
                faq2_a:
                    "No, Nodum está diseñado para ser fácil de usar y no requiere conocimientos técnicos.",
                faq3_q: "¿Puedo cambiar de plan en cualquier momento?",
                faq3_a: "Sí, podés cambiar cuando quieras...",
                faq4_q: "¿Qué soporte técnico ofrecen?",
                faq4_a: "Soporte por email, chat y teléfono.",
                footer_terms: "Términos y Condiciones",
                footer_privacy: "Política de Privacidad",
                footer_security: "Seguridad de la Información",
                footer_cookies: "Cookies",
                footer_rights: "Todos los derechos reservados.",
                footer_legal: "Legales",
                card4_title: "Agenda Inteligente",
                card4_text:
                    "Organiza tus reuniones y tareas de manera sencilla, con recordatorios automáticos y sincronización en todos tus dispositivos.",
                card3_title: "Tienda Online",
                card3_text: "Vende tus productos fácilmente con un sistema seguro, moderno y con opciones de pago integradas.",
                card2_title: "Sistema de Gestión / ERP",
                card2_text:
                    "Controla tus procesos, equipos y recursos desde un solo lugar con reportes y análisis en tiempo real.",
                card1_title: "Ecosistema Integrado",
                card1_text:
                    "Todas nuestras aplicaciones trabajan en conjunto. Agenda, gestión y ventas se sincronizan automáticamente para que tu negocio fluya sin fricciones.",
            },
            en: {
                nav_home: "Home",
                nav_solutions: "Solutions",
                nav_plans: "Plans",
                nav_faq: "FAQs",
                btn_register: "Sign up",
                btn_login: "Log in",
                hero_title:
                    "Activate your processes.<br>Without <span class='highlight'>asking for permission.</span>",
                hero_subtitle:
                    "The self-managed platform for companies that want to simplify, scale, and stop depending on third parties.",
                plans_title: "Simple plans designed to grow with your company.",
                plans_desc:
                    "Choose the module or plan that suits your needs. Immediate activation without contracts or hidden fees.",
                btn_monthly: "Monthly",
                btn_yearly: "Yearly",
                save_desc: "Save <span>35%</span>",
                plan_basic: "Basic",
                plan_basic_desc:
                    "Ideal for companies that want to start digitizing processes...",
                plan_pro: "Pro",
                plan_pro_desc:
                    "For companies that need more power, flexibility, and tools.",
                plan_enterprise: "Enterprise",
                plan_enterprise_desc: "The full Nodum experience...",
                btn_select_plan: "Select plan",
                btn_selected: "Selected",
                plan_basic_feat1: "1 active module",
                plan_basic_feat2: "Up to 3 users",
                plan_basic_feat3: "Email support",
                plan_basic_feat4: "Access to basic updates",
                plan_basic_feat5: "Centralized dashboard",
                plan_pro_feat1: "Up to 5 active modules",
                plan_pro_feat2: "Includes 10 users",
                plan_pro_feat3: "Data and report export",
                plan_pro_feat4: "Priority support via chat and email",
                plan_pro_feat5: "Basic interface customization",
                plan_enterprise_feat1: "Unlimited modules",
                plan_enterprise_feat2: "Unlimited users",
                plan_enterprise_feat3: "24/7 support with a dedicated account manager",
                plan_enterprise_feat4: "Onboarding and in-company training",
                plan_enterprise_feat5: "Scheduled exports: automatic report delivery via email",

                ecosystem_title:
                    "An ecosystem of solutions you can activate when needed.",
                ecosystem_desc:
                    "Each module is an independent tool. No intermediaries, no complex integrations.",
                label_popular: "Popular",
                features_title: "Key Features",
                faq_title: "Frequently Asked Questions (FAQ)",
                faq_subtitle: "Everything you need to know to get started",
                faq1_q: "What is Nodum and how does it work?",
                faq1_a:
                    "Nodum is an online platform that brings together different tools so your company can work simply and quickly.",
                faq2_q: "Do I need technical knowledge to use Nodum?",
                faq2_a: "No, Nodum is designed to be easy to use.",
                faq3_q: "Can I change my plan at any time?",
                faq3_a: "Yes, you can switch anytime.",
                faq4_q: "What technical support do you offer?",
                faq4_a: "Email, chat and phone support.",
                footer_terms: "Terms and Conditions",
                footer_privacy: "Privacy Policy",
                footer_security: "Information Security",
                footer_cookies: "Cookies",
                footer_rights: "All rights reserved.",
                footer_legal: "Legals",
                card4_title: "Smart Agenda",
                card4_text:
                    "Organize your meetings and tasks easily, with automatic reminders and synchronization across all your devices.",
                card3_title: "Online Store",
                card3_text:
                    "Sell your products easily with a secure, modern system and integrated payment options.",
                card2_title: "Management System / ERP",
                card2_text:
                    "Control your processes, teams, and resources from a single place with real-time reports and analytics.",
                card1_title: "Integrated Ecosystem",
                card1_text:
                    "All our applications work together. Scheduling, management, and sales sync automatically so your business flows without friction.",
            },
        };

        // --------- Elementos del DOM
        const btnMensual = document.getElementById("btnMensual");
        const btnAnual = document.getElementById("btnAnual");
        const descAhorro = document.getElementById("descAhorro");

        const btnBasico = document.getElementById("btnBasico");
        const btnPro = document.getElementById("btnPro");
        const btnEmpresarial = document.getElementById("btnEmpresarial");

        const precioBasico = document.getElementById("precioBasico");
        const precioPro = document.getElementById("precioPro");
        const precioEmpresarial = document.getElementById("precioEmpresarial");

        const preciosARS = {
            mensual: { basico: "$45.000 ARS", pro: "$60.000 ARS", empresarial: "$80.000 ARS" },
            anual: { basico: "$351.000 ARS", pro: "$468.000 ARS", empresarial: "$624.000 ARS" },
        };
        const preciosUSD = {
            mensual: { basico: "$45 USD", pro: "$60 USD", empresarial: "$80 USD" },
            anual: { basico: "$351 USD", pro: "$468 USD", empresarial: "$624 USD" },
        };

        // --------- Handlers estables (misma referencia para add/remove)
        const actualizarPrecios = (tipo) => {
            const preciosActuales = currentLang === "en" ? preciosUSD : preciosARS;
            if (!precioBasico || !precioPro || !precioEmpresarial) return;

            if (tipo === "mensual") {
                btnMensual?.classList.add("active");
                btnAnual?.classList.remove("active");
                precioBasico.textContent = preciosActuales.mensual.basico;
                precioPro.textContent = preciosActuales.mensual.pro;
                precioEmpresarial.textContent = preciosActuales.mensual.empresarial;
                if (descAhorro) descAhorro.style.display = "none";
            } else {
                btnAnual?.classList.add("active");
                btnMensual?.classList.remove("active");
                precioBasico.textContent = preciosActuales.anual.basico;
                precioPro.textContent = preciosActuales.anual.pro;
                precioEmpresarial.textContent = preciosActuales.anual.empresarial;
                if (descAhorro) descAhorro.style.display = "block";
            }
        };

        const onMensual = () => {
            currentPeriod = "mensual";
            actualizarPrecios("mensual");
        };
        const onAnual = () => {
            currentPeriod = "anual";
            actualizarPrecios("anual");
        };

        const onPlanClick = (e) => {
            const btn = e.currentTarget;
            // limpiar selección previa
            document.querySelectorAll(".plan").forEach((p) => p.classList.remove("selected"));
            [btnBasico, btnPro, btnEmpresarial].forEach((b) => {
                b?.classList.remove("selected");
                if (b) {
                    b.textContent = translations[currentLang].btn_select_plan;
                    if (b.nextElementSibling) b.nextElementSibling.textContent = "";
                    b.style.cursor = "pointer";
                }
            });
            // seleccionar actual (tarjeta + botón)
            const card = btn.closest(".plan");
            card?.classList.add("selected");
            btn.classList.add("selected");
            btn.textContent = translations[currentLang].btn_selected;
            if (btn.nextElementSibling) {
                btn.nextElementSibling.textContent =
                    currentLang === "en" ? "Hire now!" : "¡Contratar ahora!";
            }
            btn.style.cursor = "default";
        };

        const onFaq = (e) => {
            const item = e.currentTarget.closest(".faq-item");
            if (!item) return;
            item.classList.toggle("active");
            const expanded = item.classList.contains("active");
            e.currentTarget.setAttribute("aria-expanded", expanded ? "true" : "false");
        };

        const loadTranslations = (lang) => {
            currentLang = lang;
            document.querySelectorAll("[data-i18n]").forEach((el) => {
                const key = el.getAttribute("data-i18n");
                if (translations[lang][key]) el.innerHTML = translations[lang][key];
            });

            // actualizar texto de los botones según selección actual
            [btnBasico, btnPro, btnEmpresarial].forEach((btn) => {
                if (!btn) return;
                if (btn.classList.contains("selected")) {
                    btn.textContent = translations[lang].btn_selected;
                    if (btn.nextElementSibling) {
                        btn.nextElementSibling.textContent =
                            lang === "en" ? "Hire now!" : "¡Contratar ahora!";
                    }
                } else {
                    btn.textContent = translations[lang].btn_select_plan;
                    if (btn.nextElementSibling) btn.nextElementSibling.textContent = "";
                }
            });

            actualizarPrecios(currentPeriod);
        };

        const onLangClick = (e) => {
            e.preventDefault();
            const itemEl = e.currentTarget;
            const lang = itemEl.getAttribute("data-lang");
            loadTranslations(lang || "es");
            const img = itemEl.querySelector("img");
            const flag = document.getElementById("flag");
            if (flag && img) {
                flag.src = img.src;
                flag.alt = img.alt;
            }
        };

        // --------- Registrar listeners
        btnMensual?.addEventListener("click", onMensual);
        btnAnual?.addEventListener("click", onAnual);

        btnBasico?.addEventListener("click", onPlanClick);
        btnPro?.addEventListener("click", onPlanClick);
        btnEmpresarial?.addEventListener("click", onPlanClick);

        document
            .querySelectorAll(".faq-question")
            .forEach((q) => q.addEventListener("click", onFaq));

        document
            .querySelectorAll(".dropdown-menu .dropdown-item")
            .forEach((item) => item.addEventListener("click", onLangClick));

        // --------- Inicializaciones
        loadTranslations(currentLang);       // setea textos y precios (mensual por defecto)
        actualizarPrecios("mensual");        // asegura estado inicial del switch
        btnPro?.click();                     // deja "Pro" preseleccionado visualmente

        // --------- Cleanup correcto (mismas referencias)
        return () => {
            btnMensual?.removeEventListener("click", onMensual);
            btnAnual?.removeEventListener("click", onAnual);

            btnBasico?.removeEventListener("click", onPlanClick);
            btnPro?.removeEventListener("click", onPlanClick);
            btnEmpresarial?.removeEventListener("click", onPlanClick);

            document
                .querySelectorAll(".faq-question")
                .forEach((q) => q.removeEventListener("click", onFaq));

            document
                .querySelectorAll(".dropdown-menu .dropdown-item")
                .forEach((item) => item.removeEventListener("click", onLangClick));
        };
    }, []);

    // ------------------- JSX -------------------
    return (
        <div id="home-root">
            <header>
                <nav className="navbar navbar-expand-lg sticky-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#home">
                            <img src={logo} width="150" height="60" alt="Nodum Logo" id="home" />
                        </a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Menú"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 containerNav">
                                <li className="nav-item">
                                    <a className="nav-link active px-3" href="#home" data-i18n="nav_home">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link px-3" href="#soluciones" data-i18n="nav_solutions">Soluciones</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link px-3" href="#planes" data-i18n="nav_plans">Planes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link px-3" href="#faqs" data-i18n="nav_faq">FAQs</a>
                                </li>
                            </ul>

                            <div className="d-flex containerReg">
                                <div className="btn d-flex align-items-center btnBanderas" data-bs-toggle="dropdown" aria-expanded="false">
                                    <button id="btn-lang">
                                        <img
                                            width="35"
                                            height="30"
                                            id="flag"
                                            src="https://img.icons8.com/emoji/48/argentina-emoji.png"
                                            alt="argentina-emoji"
                                            className="me-2"
                                        />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="#" data-lang="es">
                                                <img width="35" height="30" src="https://img.icons8.com/emoji/48/argentina-emoji.png" alt="argentina-emoji" className="me-2" />
                                                Español
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="#" data-lang="en">
                                                <img width="35" height="30" src="https://img.icons8.com/emoji/48/united-kingdom-emoji.png" alt="united-kingdom-emoji" className="me-2" />
                                                English
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <Link to="/Register"  className="link-registrarme" ><button type="button" className="btn" data-i18n="btn_register">Registrarme</button></Link>
                                <Link to="/Login"><button type="button" className="btn btn-primary" data-i18n="btn_login">Ingresar</button></Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <section className="hero">
                    <div>
                        <h1 data-i18n="hero_title">
                            Activá tus procesos.<br />Sin <span className="highlight">pedir permiso.</span>
                        </h1>
                        <p data-i18n="hero_subtitle">
                            La plataforma autogestionada para empresas que quieren simplificar, escalar y dejar de depender de terceros.
                        </p>
                    </div>
                </section>
            </header>

            <main>
                <div className="px-4 py-5 my-5 text-center">
                    <h2 className="display-5 fw-bold text-body-emphasis" data-i18n="ecosystem_title">
                        Un ecosistema de soluciones activables según tu necesidad.
                    </h2>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4" data-i18n="ecosystem_desc">
                            En Nodum, cada modulo es una herramienta independiente que podes activar cuando lo necesitas.
                            Sin intermediaros, sin integraciones complejas, sin esperar permisos.
                        </p>
                    </div>
                </div>

                <section id="soluciones">
                    <div className="row row-cols-1 row-cols-md-4 g-3 cards mx-auto">
                        <div className="col">
                            <div className="card h-100">
                                <img src={img1} className="card-img-top" alt="Tecnología visionaria" />
                                <div className="card-body">
                                    <h5 className="card-title" data-i18n="card1_title" style={{ textDecoration: "underline" }}>Card title</h5>
                                    <p className="card-text" data-i18n="card1_text">This is a longer card…</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card h-100">
                                <img src={img2} className="card-img-top" alt="Dark mode app" />
                                <div className="card-body">
                                    <h5 className="card-title" data-i18n="card2_title" style={{ textDecoration: "underline" }}>Card title</h5>
                                    <p className="card-text" data-i18n="card2_text">This is a short card.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card h-100">
                                <img src={img3} className="card-img-top" alt="Reservas" />
                                <div className="card-body">
                                    <h5 className="card-title" data-i18n="card3_title" style={{ textDecoration: "underline" }}>Card title</h5>
                                    <p className="card-text" data-i18n="card3_text">This is a longer card…</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card h-100">
                                <img src={img4} className="card-img-top" alt="Trabajo remoto" />
                                <div className="card-body">
                                    <h5 className="card-title" data-i18n="card4_title" style={{ textDecoration: "underline" }}>Card title</h5>
                                    <p className="card-text" data-i18n="card4_text">This is a longer card…</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="px-4 py-5 my-5 text-center">
                        <h3 className="display-5 fw-bold text-body-emphasis" data-i18n="plans_title">
                            Planes simples y diseñados para crecer con tu empresa.
                        </h3>
                        <div className="col-lg-6 mx-auto">
                            <p className="lead mb-4" data-i18n="plans_desc">
                                Elegí el módulo o plan que se ajuste a tus necesidades. Activación inmediata sin contratos ni costos ocultos.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="planes">
                    <div className="row g-2 justify-content-center">
                        <div className="col-12 col-md-auto">
                            <button id="btnMensual" className="switch-btn active btn btn-lg w-100" data-i18n="btn_monthly">Mensual</button>
                        </div>
                        <div className="col-12 col-md-auto">
                            <button id="btnAnual" className="switch-btn btn btn-lg w-100" data-i18n="btn_yearly">Anual</button>
                        </div>
                    </div>

                    <div className="switch-description" id="descAhorro">
                        <p data-i18n="save_desc">Ahorra un <span>35%</span></p>
                    </div>

                    <div className="plans-container">
                        <div className="plan" id="planBasico">
                            <h3 data-i18n="plan_basic">Básico</h3>
                            <div className="description" data-i18n="plan_basic_desc">
                                Ideal para empresas que quieren empezar a digitalizar procesos con un sistema autogestionado y sin complicaciones.
                            </div>
                            <div className="price" id="precioBasico">$351.000</div>
                            <button id="btnBasico" className="btn-plan" data-i18n="btn_select_plan">Seleccionar plan</button>
                            <div className="btn-subtext" data-i18n="btn_subtext_basic"></div>
                            <div className="features">
                                <strong data-i18n="features_title">Características</strong>
                                <ul>
                                    <li data-i18n="plan_basic_feat1">1 módulo activo</li>
                                    <li data-i18n="plan_basic_feat2">Hasta 3 usuarios.</li>
                                    <li data-i18n="plan_basic_feat3">Soporte por email.</li>
                                    <li data-i18n="plan_basic_feat4">Acceso a actualizaciones básicas.</li>
                                    <li data-i18n="plan_basic_feat5">Panel de control centralizado</li>
                                </ul>
                            </div>
                        </div>

                        <div className="plan popular" id="planPro">
                            <div className="popular-label" title="Popular" data-i18n="label_popular">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                                Popular
                            </div>
                            <h3 data-i18n="plan_pro">Pro</h3>
                            <div className="description" data-i18n="plan_pro_desc">
                                Para empresas que necesitan más potencia, flexibilidad y herramientas para optimizar procesos y colaborar en equipo.
                            </div>
                            <div className="price" id="precioPro">$468.000 ARS</div>
                            <button id="btnPro" className="btn-plan" data-i18n="btn_select_plan">Seleccionar plan</button>
                            <div className="btn-subtext" data-i18n="btn_cta_now"></div>
                            <div className="features">
                                <strong data-i18n="features_title">Características</strong>
                                <ul>
                                    <li data-i18n="plan_pro_feat1">Hasta 5 módulos activos</li>
                                    <li data-i18n="plan_pro_feat2">10 usuarios incluidos.</li>
                                    <li data-i18n="plan_pro_feat3">Exportación de datos y reportes.</li>
                                    <li data-i18n="plan_pro_feat4">Soporte prioritario por chat y email.</li>
                                    <li data-i18n="plan_pro_feat5">Personalización básica de interfaz.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="plan" id="planEmpresarial">
                            <h3 data-i18n="plan_enterprise">Empresarial</h3>
                            <div className="description" data-i18n="plan_enterprise_desc">
                                La experiencia completa de Nodum. Diseñada para organizaciones con necesidades de personalización avanzada.
                            </div>
                            <div className="price" id="precioEmpresarial">$624.000 ARS</div>
                            <button id="btnEmpresarial" className="btn-plan" data-i18n="btn_select_plan">Seleccionar plan</button>
                            <div className="btn-subtext" data-i18n="btn_subtext_enterprise"></div>
                            <div className="features">
                                <strong data-i18n="features_title">Características</strong>
                                <ul>
                                    <li data-i18n="plan_enterprise_feat1">Módulos ilimitados.</li>
                                    <li data-i18n="plan_enterprise_feat2">Usuarios ilimitados</li>
                                    <li data-i18n="plan_enterprise_feat3">Soporte 24/7 con gestor de cuenta asignado.</li>
                                    <li data-i18n="plan_enterprise_feat4">Onboarding y capacitación in company.</li>
                                    <li data-i18n="plan_enterprise_feat5">Exportaciones programadas: envío automático de reportes por email.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="faq-section" id="faqs">
                    <h2 data-i18n="faq_title">Preguntas Frecuentes (FAQ)</h2>
                    <p className="faq-subtitle" data-i18n="faq_subtitle">Todo lo que tenés que saber para empezar</p>

                    <div className="faq-item">
                        <div className="faq-question" role="button" tabIndex={0} aria-expanded="false" aria-controls="faq1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50" aria-hidden="true" focusable="false">
                                <path fill="currentColor" d="M439.4 96L448 96C483.3 96 512 124.7 512 160L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 160C128 124.7 156.7 96 192 96L200.6 96C211.6 76.9 232.3 64 256 64L384 64C407.7 64 428.4 76.9 439.4 96zM376 176C389.3 176 400 165.3 400 152C400 138.7 389.3 128 376 128L264 128C250.7 128 240 138.7 240 152C240 165.3 250.7 176 264 176L376 176zM320 312C336.1 312 349.2 325.1 349.2 341.2C349.2 349.9 346.1 355.1 342.3 358.9C337.8 363.3 331.6 366.4 325.5 368.4C310.6 373.4 296 387.7 296 407.9C296 421.2 306.7 431.9 320 431.9C331.5 431.9 341.2 423.8 343.5 412.9C362.7 405.8 397.2 386.6 397.2 341.1C397.2 298.5 362.6 263.9 320 263.9C277.4 263.9 242.8 298.5 242.8 341.1C242.8 354.4 253.5 365.1 266.8 365.1C280.1 365.1 290.8 354.4 290.8 341.1C290.8 325 303.9 311.9 320 311.9zM348 480C348 464.5 335.5 452 320 452C304.5 452 292 464.5 292 480C292 495.5 304.5 508 320 508C335.5 508 348 495.5 348 480z" />
                            </svg>
                            <span id="faq1-label" data-i18n="faq1_q">¿Qué es Nodum y cómo funciona?</span>
                            <span className="faq-arrow" aria-hidden="true">⌄</span>
                        </div>
                        <div className="faq-answer" id="faq1" role="region" aria-labelledby="faq1-label" data-i18n="faq1_a">
                            Nodum es una plataforma online…
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question" role="button" tabIndex={0} aria-expanded="false" aria-controls="faq2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50" aria-hidden="true" focusable="false">
                                <path fill="currentColor" d="M439.4 96L448 96C483.3 96 512 124.7 512 160L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 160C128 124.7 156.7 96 192 96L200.6 96C211.6 76.9 232.3 64 256 64L384 64C407.7 64 428.4 76.9 439.4 96zM376 176C389.3 176 400 165.3 400 152C400 138.7 389.3 128 376 128L264 128C250.7 128 240 138.7 240 152C240 165.3 250.7 176 264 176L376 176zM320 312C336.1 312 349.2 325.1 349.2 341.2C349.2 349.9 346.1 355.1 342.3 358.9C337.8 363.3 331.6 366.4 325.5 368.4C310.6 373.4 296 387.7 296 407.9C296 421.2 306.7 431.9 320 431.9C331.5 431.9 341.2 423.8 343.5 412.9C362.7 405.8 397.2 386.6 397.2 341.1C397.2 298.5 362.6 263.9 320 263.9C277.4 263.9 242.8 298.5 242.8 341.1C242.8 354.4 253.5 365.1 266.8 365.1C280.1 365.1 290.8 354.4 290.8 341.1C290.8 325 303.9 311.9 320 311.9zM348 480C348 464.5 335.5 452 320 452C304.5 452 292 464.5 292 480C292 495.5 304.5 508 320 508C335.5 508 348 495.5 348 480z" />
                            </svg>
                            <span id="faq2-label" data-i18n="faq2_q">¿Necesito conocimientos técnicos para usar Nodum?</span>
                            <span className="faq-arrow" aria-hidden="true">⌄</span>
                        </div>
                        <div className="faq-answer" id="faq2" role="region" aria-labelledby="faq2-label" data-i18n="faq2_a">
                            No, Nodum está diseñado para ser fácil de usar…
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question" role="button" tabIndex={0} aria-expanded="false" aria-controls="faq3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50" aria-hidden="true" focusable="false">
                                <path fill="currentColor" d="M439.4 96L448 96C483.3 96 512 124.7 512 160L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 160C128 124.7 156.7 96 192 96L200.6 96C211.6 76.9 232.3 64 256 64L384 64C407.7 64 428.4 76.9 439.4 96zM376 176C389.3 176 400 165.3 400 152C400 138.7 389.3 128 376 128L264 128C250.7 128 240 138.7 240 152C240 165.3 250.7 176 264 176L376 176zM320 312C336.1 312 349.2 325.1 349.2 341.2C349.2 349.9 346.1 355.1 342.3 358.9C337.8 363.3 331.6 366.4 325.5 368.4C310.6 373.4 296 387.7 296 407.9C296 421.2 306.7 431.9 320 431.9C331.5 431.9 341.2 423.8 343.5 412.9C362.7 405.8 397.2 386.6 397.2 341.1C397.2 298.5 362.6 263.9 320 263.9C277.4 263.9 242.8 298.5 242.8 341.1C242.8 354.4 253.5 365.1 266.8 365.1C280.1 365.1 290.8 354.4 290.8 341.1C290.8 325 303.9 311.9 320 311.9zM348 480C348 464.5 335.5 452 320 452C304.5 452 292 464.5 292 480C292 495.5 304.5 508 320 508C335.5 508 348 495.5 348 480z" />
                            </svg>
                            <span id="faq3-label" data-i18n="faq3_q">¿Puedo cambiar de plan en cualquier momento?</span>
                            <span className="faq-arrow" aria-hidden="true">⌄</span>
                        </div>
                        <div className="faq-answer" id="faq3" role="region" aria-labelledby="faq3-label" data-i18n="faq3_a">
                            No, Nodum está diseñado para ser fácil de usar…
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question" role="button" tabIndex={0} aria-expanded="false" aria-controls="faq4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50" aria-hidden="true" focusable="false">
                                <path fill="currentColor" d="M439.4 96L448 96C483.3 96 512 124.7 512 160L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 160C128 124.7 156.7 96 192 96L200.6 96C211.6 76.9 232.3 64 256 64L384 64C407.7 64 428.4 76.9 439.4 96zM376 176C389.3 176 400 165.3 400 152C400 138.7 389.3 128 376 128L264 128C250.7 128 240 138.7 240 152C240 165.3 250.7 176 264 176L376 176zM320 312C336.1 312 349.2 325.1 349.2 341.2C349.2 349.9 346.1 355.1 342.3 358.9C337.8 363.3 331.6 366.4 325.5 368.4C310.6 373.4 296 387.7 296 407.9C296 421.2 306.7 431.9 320 431.9C331.5 431.9 341.2 423.8 343.5 412.9C362.7 405.8 397.2 386.6 397.2 341.1C397.2 298.5 362.6 263.9 320 263.9C277.4 263.9 242.8 298.5 242.8 341.1C242.8 354.4 253.5 365.1 266.8 365.1C280.1 365.1 290.8 354.4 290.8 341.1C290.8 325 303.9 311.9 320 311.9zM348 480C348 464.5 335.5 452 320 452C304.5 452 292 464.5 292 480C292 495.5 304.5 508 320 508C335.5 508 348 495.5 348 480z" />
                            </svg>
                            <span id="faq4-label" data-i18n="faq4_q">¿Qué soporte técnico ofrecen?</span>
                            <span className="faq-arrow" aria-hidden="true">⌄</span>
                        </div>
                        <div className="faq-answer" id="faq4" role="region" aria-labelledby="faq4-label" data-i18n="faq4_a">
                            Soporte por email, chat y teléfono.
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <img src={logoFooter} alt="Nodum Logo" className="img-fluid" />
                    </div>

                    <div className="footer-links">
                        <h4 data-i18n="footer_legal">Legales</h4>
                        <ul>
                            <li><a href="#" data-i18n="footer_terms">Términos y Condiciones</a></li>
                            <li><a href="#" data-i18n="footer_privacy">Política de Privacidad</a></li>
                            <li><a href="#" data-i18n="footer_security">Seguridad de la Información</a></li>
                            <li><a href="#" data-i18n="footer_cookies">Cookies</a></li>
                        </ul>
                    </div>

                    <div className="footer-social" role="navigation" aria-label="Redes sociales">
                        <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50">
                            <path fill="#000000"
                                d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                        </svg></a>
                        <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50">
                            <path fill="#000000"
                                d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM457.1 180L353.3 298.6L475.4 460L379.8 460L305 362.1L219.3 460L171.8 460L282.8 333.1L165.7 180L263.7 180L331.4 269.5L409.6 180L457.1 180zM419.3 431.6L249.4 206.9L221.1 206.9L392.9 431.6L419.3 431.6z" />
                        </svg></a>
                        <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50">
                            <path fill="#000000"
                                d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
                        </svg></a>
                        <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50">
                            <path fill="#000000"
                                d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM435 240.7C431.3 279.9 415.1 375.1 406.9 419C403.4 437.6 396.6 443.8 390 444.4C375.6 445.7 364.7 434.9 350.7 425.7C328.9 411.4 316.5 402.5 295.4 388.5C270.9 372.4 286.8 363.5 300.7 349C304.4 345.2 367.8 287.5 369 282.3C369.2 281.6 369.3 279.2 367.8 277.9C366.3 276.6 364.2 277.1 362.7 277.4C360.5 277.9 325.6 300.9 258.1 346.5C248.2 353.3 239.2 356.6 231.2 356.4C222.3 356.2 205.3 351.4 192.6 347.3C177.1 342.3 164.7 339.6 165.8 331C166.4 326.5 172.5 322 184.2 317.3C256.5 285.8 304.7 265 328.8 255C397.7 226.4 412 221.4 421.3 221.2C423.4 221.2 427.9 221.7 430.9 224.1C432.9 225.8 434.1 228.2 434.4 230.8C434.9 234 435 237.3 434.8 240.6z" />
                        </svg></a>
                        <a href=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="50" height="50">
                            <path fill="#000000"
                                d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
                        </svg></a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 BTL S.A. <span data-i18n="footer_rights">Todos los derechos reservados.</span></p>
                </div>
            </footer>
        </div>
    );
}
