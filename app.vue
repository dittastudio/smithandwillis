<template>
  <div class="site">
    <AppLayout>
      <template #header>
        <AppHeader />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter />
      </template>

      <template #dev>
        <ToolGuide />
      </template>
    </AppLayout>
  </div>
</template>
