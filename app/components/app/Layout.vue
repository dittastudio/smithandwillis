<template>
  <div class="isolate">
    <header class="sticky top-0 z-10">
      <slot name="header" />
    </header>

    <main
      class="
      relative
      z-1
      min-h-screen
       bg-white
       before:absolute
       before:top-full
       before:w-full
       before:h-px
       before:bg-offblack/10
      "
    >
      <slot name="main" />
    </main>

    <UiStickyWrapper>
      <footer>
        <slot name="footer" />
      </footer>
    </UiStickyWrapper>

    <div id="contact" />

    <DevOnly>
      <slot name="dev" />
    </DevOnly>
  </div>
</template>
