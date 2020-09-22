# VueJS Modal

  Simple And Flexible VueJs Modal
  
## Getting Started

```
// installation via npm
npm i -S simple-vuejs-modal

// or

// installation via yarn
yarn add simple-vuejs-modal
```

## Usage


#### SignIn.vue
```vue
<template>
  <VueModal name="signIn">
    <template slot="header">
      Head
    </template>
    <template slot="body">
      Body
    </template>
  </VueModal>
</template>

<script>
import VueModal from '@/simple-vuejs-modal.vue';

export default {
name: "SignIn",
  components:{
    VueModal
  }
}
</script>
```

#### Home.vue

```vue
<template>
  <div>
    <SignIn />

    <a href="#" @click.prevent="$modal.show('signIn')">Open Modal</a>
  </div>
</template>

<script>
import SignIn from './SignIn';

export default {
name: "Home",
  components:{
    SignIn
  }
}
</script>

<style scoped>

</style>
```

##### Open Modal

```
//In Script
this.$modal.show('signIn')

In Templete
$modal.show('signIn')
```

##### Close Modal

```
this.$modal.hide('signIn')
```

##### Dynamic modals 

```
this.$modal.show(componentName', Properties)

For Example : this.$modal.show('signIn', {name: "Paul"})
```