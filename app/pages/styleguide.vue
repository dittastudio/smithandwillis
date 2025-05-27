<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'
import IconLogo from '@/assets/icons/logo.svg'

const classesSectionTitle = 'type-mix-small-caps border-b border-current/20 pb-2 mb-10'
</script>

<template>
  <div class="relative mt-8 mb-30">
    <div class="wrapper">
      <h1 class="type-mix-medium-caps">
        Styleguide
      </h1>

      <section class="my-20">
        <h2 :class="classesSectionTitle">
          Logos
        </h2>

        <div class="flex flex-col gap-10">
          <IconLogo class="w-100 h-8" />

          <IconLogoMark class="size-50 opacity-10" />
        </div>
      </section>

      <section class="my-20">
        <h2 :class="classesSectionTitle">
          Typography
        </h2>

        <div class="flex flex-col gap-4">
          <h1 class="type-sans-large-caps">
            Text Large Caps
          </h1>

          <h1 class="type-sans-large">
            Text Large
          </h1>

          <p class="type-sans-large max-w-[60ch]">
            <strong class="font-mix tracking-sm">I’ve always wanted to cook in a restaurant</strong> that felt like home. One of my fondest memories is of making tortelli with my aunt in Campania
          </p>

          <br>

          <h2 class="type-sans-medium-caps">
            Text Medium Caps
          </h2>

          <h2 class="type-sans-medium">
            Text Medium
          </h2>

          <p class="type-sans-medium max-w-[60ch]">
            <strong class="font-mix tracking-sm">Lorem ipsum dolor sit amet</strong> consectetur adipisicing elit. Voluptatem modi laboriosam unde odio praesentium ab quae ut temporibus vero. Nulla accusamus quisquam quas ullam dolore delectus magni at dolor et?
          </p>

          <br>

          <h3 class="type-mix-medium-caps">
            Text Mix Medium Caps
          </h3>

          <h4 class="type-mix-small-caps">
            Text Mix Small Caps
          </h4>

          <h5 class="type-mix-xsmall-caps">
            Text Mix Extra Small Caps
          </h5>
        </div>
      </section>
    </div>
  </div>
</template>
