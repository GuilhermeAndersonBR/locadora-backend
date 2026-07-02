<script setup lang="ts">
import PaymentFilters
    from "@/components/payment/PaymentFilters.vue";

import PaymentTable
    from "@/components/payment/PaymentTable.vue";
</script>

<template>
  <div class="space-y-6">
    <div
      class="
                flex
                items-center
                justify-between
            "
    >
      <div>
        <h1
          class="
                        text-3xl
                        font-bold
                    "
        >
          Pagamentos
        </h1>

        <p
          class="
                        text-muted-foreground
                    "
        >
          Gerencie todos os pagamentos realizados.
        </p>
      </div>
    </div>

    <PaymentFilters />

    <PaymentTable />
  </div>
</template>