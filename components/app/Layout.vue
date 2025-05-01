<template>
  <div class="isolate">
    <header class="sticky top-0 z-10">
      <slot name="header" />
    </header>

    <main class="relative z-1 min-h-screen bg-offblack">
      <slot name="main" />
    </main>

    <UiStickyWrapper>
      <footer>
        <slot name="footer" />
      </footer>
    </UiStickyWrapper>

    <div id="contact" />

    <slot name="dev" />
  </div>
</template>
