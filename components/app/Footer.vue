<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())

const classesMetaLink = 'block opacity-70 hover:opacity-100 transition-opacity duration-300 ease-out'
</script>

<template>
  <footer class="bg-rich-brown text-white pt-20 pb-16">
    <div class="wrapper">
      <div class="grid gap-x-[var(--app-inner-gutter)] gap-y-8 grid-cols-2 md:grid-cols-12">
        <div class="col-span-full md:col-span-3 lg:col-span-2 flex flex-col gap-4">
          <h4 class="t-md-mix-caps">
            Studio
          </h4>

          <address class="t-md not-italic">
            1 Hat & Mitre Court
            <br>
            London
            <br>
            EC1M 4EH
          </address>
        </div>

        <div class="col-span-full md:col-span-3 lg:col-span-2 flex flex-col gap-4">
          <h4 class="t-md-mix-caps">
            Places
          </h4>

          <ul class="t-md not-italic">
            <li>
              Luca
            </li>

            <li>
              Osip
            </li>

            <li>
              The Loft
            </li>
          </ul>
        </div>

        <div class="col-span-full md:col-span-3 lg:col-span-3 flex flex-col gap-4">
          <h4 class="t-md-mix-caps">
            Contact
          </h4>

          <ul class="t-md not-italic">
            <li>
              <a href="mailto:hello@smithandwillis.london">
                hello@smithandwillis.london
              </a>
            </li>

            <li>
              <a href="mailto:careers@smithandwillis.london">
                careers@smithandwillis.london
              </a>
            </li>

            <li>
              <a href="tel:+442038965454">
                +44 203 896 5454
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__meta-container mt-16">
        <ul class="footer__meta-list t-xs-mix-caps flex flex-col items-center md:flex-row md:flex-wrap md:justify-start md:items-start md:text-left gap-x-4">
          <li class="footer__meta-item">
            <p class="opacity-70">
              &copy;{{ currentYear }} All rights reserved
            </p>
          </li>

          <li class="footer__meta-item">
            <a
              href="/"
              class="footer-meta-links"
              :class="classesMetaLink"
            >
              Privacy Policy
            </a>
          </li>

          <li class="footer__meta-item">
            <a
              href="/"
              :class="classesMetaLink"
            >
              Made by ditta
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style>
@reference "../../assets/css/main.css";

.footer__meta-container {
  @variant md {
    overflow: hidden;
  }
}

.footer__meta-list {
  margin-left: -3ch;
}

.footer__meta-item {
  position: relative;
  padding-left: 3ch;

  &:before {
    content: '/';
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
