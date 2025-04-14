<template>
  <div class="isolate flex flex-col min-h-screen">
    <header class="sticky top-0 z-10">
      <slot name="header" />
    </header>

    <main class="flex-grow z-1 bg-warm-grey">
      <slot name="main" />
    </main>

    <UiStickyWrapper>
      <footer>
        <slot name="footer" />
      </footer>
    </UiStickyWrapper>

    <slot name="dev" />
  </div>
</template>
