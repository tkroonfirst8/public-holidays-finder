<template>
  <div class="layout">
    <!-- Header -->
    <header class="header">
      <Toolbar>
        <div class="left">
          <Button icon="pi pi-bars" class="p-button-rounded p-button-text" @click="toggleMenu" />
        </div>
        <div class="title">
          <h1>My Application</h1>
        </div>
      </Toolbar>
    </header>

    <div class="content">
      <!-- Navigation Menu -->
      <aside v-show="menuVisible" class="navigation">
        <PanelMenu :model="menuItems" />
      </aside>

      <!-- Main Content -->
      <main class="main">
        <h2>Welcome!</h2>
        <p>This is the main content area.</p>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import PanelMenu from 'primevue/panelmenu'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'

export default {
  name: 'ResponsiveLayout',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { PanelMenu, Toolbar, Button },
  setup() {
    const menuVisible = ref(true)

    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value
    }

    const menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        command: () => alert('Dashboard clicked!'),
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
          },
          {
            label: 'Security',
            icon: 'pi pi-fw pi-lock',
          },
        ],
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => alert('Logout clicked!'),
      },
    ]

    return { menuVisible, toggleMenu, menuItems }
  },
}
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  flex: 0 0 auto;
  background-color: var(--surface-a);
  box-shadow: var(--shadow-2);
  padding: 1rem;
}

.content {
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
}

.navigation {
  flex: 0 0 250px;
  background-color: var(--surface-b);
  padding: 1rem;
  overflow-y: auto;
  box-shadow: var(--shadow-1);
}

.main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .navigation {
    flex: 0 0 200px;
  }

  .main {
    padding: 1rem;
  }
}
</style>
