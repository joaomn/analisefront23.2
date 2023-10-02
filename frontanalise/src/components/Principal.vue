<template>
  <!--header-->
  <div class="barra">
    <div class="texto">
      <h1>Contabilidade</h1>
    </div>
  </div>
  <!--fim header-->
  <!-- Menu-->
  <div class="card relative z-2 gap-3">
    <Menubar :model="items" />
  </div>
  <!-- tabela principal-->
  <div class="tabela">
    <DataTable :value="pessoas" v-show="tablaUsuario" tableStyle="min-width: 80rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Lista de Contribuintes</span>
          <div class="flex justify-content-end gap-4">
            <Button
              v-tooltip.top="'Adicionar um Contribuinte'"
              style="background-color: green"
              icon="pi pi-user-plus"
              @click="visibleAddContribuinte = true"
              rounded
              raised
            />
          </div>
        </div>
      </template>
      <Column field="nome" header="Nome"></Column>
      <Column field="status" header="Status" style="min-width: 200px">
        <template #body="slotProps">
          <span v-if="slotProps.data.status === true">
            <i class="pi pi-check"></i>
            Ativo
          </span>
          <span v-else>
            <i class="pi pi-ban"></i>
            Inativo
          </span>
        </template>
      </Column>

      <Column header="">
        <template #body="slotProps">
          <Button
            label="Editar"
            icon="pi pi-user-edit"
            severity="warning"
            class="m-1 w-5"
            @click="abrirEditar(slotProps.data)"
          />
          <Button label="Apagar" severity="danger" icon="pi pi-trash" class="m-1 w-6" @click="abrirDeletar(slotProps.data)" />
        </template>
      </Column>
      <template #footer>
        Um total de {{ pessoas ? pessoas.length : 0 }} pessoas.
      </template>
    </DataTable>
  </div>

  <!--tabela principal de contirbuicoes-->
  <div class="tabela">
    <DataTable :value="billing" v-show="!tablaUsuario" tableStyle="min-width: 80rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold"
            >Lista de Contribuições de {{ datacorrente  }}</span
          >
          <div class="flex justify-content-end gap-4">
            <Button
              v-tooltip.top="'Adicionar contribuição'"
              style="background-color: green"
              icon="pi pi-plus"
              @click="visibleAddContribuicao = true"
              rounded
              raised
            />
            <Button
              v-tooltip.top="'Selecionar datas de contribuição'"
              style="background-color: rgb(15, 38, 141)"
              icon="pi pi-calendar-plus"
              @click="visibleChangeData = true"
              rounded
              raised
            />
          </div>
        </div>
      </template>
      <Column field="contribuinte.nome" header="Participante"></Column>
      <Column field="valor" header="Valor de Contribuição"></Column>
      <Column field="data" header="Data"></Column>
      

      <Column header="">
        <template #body="slotProps">
          <Button
            label="Editar"
            icon="pi pi-user-edit"
            severity="warning"
            class="m-1 w-5"
          />
          <Button label="Apagar" severity="danger" icon="pi pi-trash" class="m-1 w-6" />
        </template>
      </Column>
      <template #footer>
       
      </template>
    </DataTable>
  </div>

  <!--Modal de inserir contribuinte-->
  <Sidebar v-model:visible="visibleAddContribuinte" position="right">
    <h2>Adicionar Contribuinte</h2>
    <p class="mt-2">Aqui voce pode Adicionar contribuintes</p>

    <form class="p-fluid">
      <div class="field mt-5">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText placeholder="Nome" v-model="contribuinte.nome" required />
        </div>
      </div>
      <div class="field">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon gap-8">
            Status
            <InputSwitch v-model="contribuinte.status" class="mr-5" />
          </span>
        </div>
      </div>

      <Button type="submit" label="Enviar" class="mt-2" @click="addContribuinte"></Button>
    </form>
  </Sidebar>

  <!--Modal de selecionar data-->
  <Sidebar v-model:visible="visibleChangeData" position="right">
    <h2>Pesquisar por Data</h2>
    <p class="mt-2">Aqui voce pode pesquisar as contribuições por data</p>
    <form class="p-fluid">
      <div class="mt-4 mb-4">
        <Calendar v-model="meseano" dateFormat="yy/mm/dd" showIcon />
      </div>

           
      <Button type="submit" label="Buscar" class="mt-2" @click="getBillingDate(meseano)"></Button>
    </form>
  </Sidebar>

  <!--Modal editar usuario-->
  <Dialog v-model:visible="modalEditUser" modal header="Editar Ususario" :style="{ width: '50vw' }">
    <form class="p-fluid">
      <div class="field mt-5">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText placeholder="Nome" v-model="pessoaEdit.nome" required />
        </div>
      </div>
      <div class="field">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon gap-8">
            Status
            <InputSwitch v-model="pessoaEdit.status" class="mr-5" />
          </span>
        </div>
      </div>

      <Button type="submit" label="Editar" severity="sucess" class="mt-2" @click="editarPessoa(pessoaEdit.id)"></Button>
    </form>
</Dialog>

<!--Modal deletar usuario-->
<Dialog v-model:visible="modalDeleteUser" :style="{ width: '650px' }" header="Deletar" :modal="true">

  <div class="">
      Tem certeza que deseja deletar o usuario?
  </div>
  <Div class="botaoDeletar m-3">

      <Button label="Sair" icon="pi pi-times" style="background-color: #f2f2f2; width: 90px;height:40px ;"
          @click="closeDelete" autofocus class="p-button-text" />
      <Button label="Deletar" icon="pi pi-trash"
          style="background-color: rgba(194, 0, 0, 0.897);width: 110px;height:43px ;margin-left: 10px;"
          @click="deletarPessoa(pessoaDelet.id)" />
  </Div>
</Dialog>

<!--Modal de inserir contribuicao-->
<Sidebar v-model:visible="visibleAddContribuicao" position="right">
  <h2>Adicionar Contribuição</h2>
  <p class="mt-2">Aqui voce pode Adicionar contribuições</p>

  <form class="p-fluid">
    <div class="field mt-5">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <MultiSelect v-model="pessoas.id" :options="pessoas" optionLabel="nome" placeholder="Selecione o Participante"
            :maxSelectedLabels="1" class="w-full md:w-20rem" />
      </div>
    </div>
    <div class="field">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon gap-8">
          Valor
          <InputNumber v-model="valor"  :minFractionDigits="2" />
        </span>
      </div>
    </div>

    <Button type="submit" label="Salvar" style="background-color: green;" class="mt-2" @click="addContribuicao()"></Button>
  </form>
</Sidebar>

  <!--barra inferior-->
  <!-- <div class="inferior"></div>-->
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { formatDiagnostic } from "typescript";
export default {
  data() {
    return {
      items: ref([
        {
          label: "Usuarios",
          icon: "pi pi-fw pi-user",
          command: () => {
            this.tablaUsuario = true;
          },
        },
        {
          label: "Contribuições",
          icon: "pi pi-fw pi-money-bill",
          command: () => {
            this.tablaUsuario = false;
          },
        },
      ]),
      pessoas: [],
      billing: [],
      contribuinte: {
        id: "",
        nome: "",
        status: '',
      },
      contribuicao: {
        id: "",
        data: "",
        valor: "",
        contribuinte: {
          id: "",
        },
      },
      visibleAddContribuinte: false,
      visibleAddContribuicao:false ,
      visibleChangeData: false,
      meseano: "09/2023",
      datacorrente: '',
      tablaUsuario: true,
      modalEditUser: false,
      modalDeleteUser: false,
      modalEditBilling: false,
      modalDeleteBilling: false,
    };
  },
  filters: {
    formatarData(value) {
      if (!value) return "";
      
      const partes = value.split("/");
      if (partes.length === 3) {
        const [ano, mes, dia] = partes;
        return `${mes}/${ano}`;
      }
      
      return value;
    }
  },

 async mounted() {
    this.loadData();
    this.loadBilling()
   
  },
  methods: {
    getDataAtualComDia1() {
  const dataAtual = new Date(); // Obtém a data atual
  dataAtual.setDate(1); // Define o dia como 01

  return dataAtual;
},
    async loadData() {
      let result = await axios.get("http://localhost:9080/api/participante");
      this.pessoas = result.data;
      console.log(result);
    },

    async loadBilling() {    
      console.log(new Date().setDate(1).toString().split("T")[0])
      this.datacorrente = this.getDataAtualComDia1().toISOString().split("T")[0];
      

      let resultado = await axios.get(
        "http://localhost:9080/api/contribuicao/buscar/" + this.datacorrente
      );
      this.billing = resultado.data;
      console.log(this.billing)
    },
    async getBillingDate(data) {    
      const dataFromURL = data;
      const dataObj = new Date(dataFromURL); 
      const dia = dataObj.getDate();
      const mes = dataObj.getMonth() + 1; // Lembre-se que os meses em JavaScript são indexados a partir de 0, então você precisa adicionar 1.
      const ano = dataObj.getFullYear();  
      const dataFormatada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`; 
      

      let resultado = await axios.get(
        "http://localhost:9080/api/contribuicao/buscar/" + dataFormatada
      );
      this.billing = resultado.data;
      console.log(this.billing)
    },
    async addContribuinte(){
      await axios.post("http://localhost:9080/api/participante", this.contribuinte)
      .then(resp =>{
        console.log('sucesso')
      })
      .catch(err =>{
        console.error(`erro ${err}`)
      })
    },
    abrirEditar(conteudo){
      this.pessoaEdit = {...conteudo}
      this.modalEditUser = true;
    },
    async editarPessoa(id){
      await axios.put("http://localhost:9080/api/participante/" + id, this.pessoaEdit
        )
      .then(foi=>{
        alert("editado com sucesso")
        this.modalEditUser = false;
      })
      .catch(err=>{
        alert(`${err}`);
      })
    },
    abrirDeletar(cont){
      this.pessoaDelet = {...cont}
      this.modalDeleteUser = true;

    },
    closeDelete(){
      this.modalDeleteUser=false;
    },
    async deletarPessoa(id){
      await axios.delete("http://localhost:9080/api/participante/" + id)
      .then(resp =>{
        this.modalDeleteUser=false;
        alert("deletado com sucesso");
        location.reload();
      })
      .catch(ee=>{
        this.modalDeleteUser=false;
        alert("Erro ao Deletar!")
      })
    }
  },
  async addContribuicao(){
    this.contribuicao.contribuinte.id = this.contribuinte.id;
    this.contribuicao.data = new Date().setDate(1).toString().split("T")[0];
    this.contribuicao.valor = this.valor;
    await axios.post("http://localhost:9080/api/contribuicao", this.contribuicao)
    .then(resp =>{
      alert("contribuicao cadstrada")
    })
    .catch(err =>{
      alert("erro ao inseiri")
    })
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Titan+One&family=Ubuntu&display=swap");
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: "Ubuntu", sans-serif;
}

.barra {
  background: rgb(23, 151, 33);
  width: 100%;
  height: 5rem;
  border-bottom: 2px solid black;
}
.inferior {
  background: rgb(23, 151, 33);
  width: 100%;
  height: 2rem;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  position: fixed;
  bottom: 0;
}
.texto {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6px;
}
.texto h1 {
  font-size: 3em;
  color: #fff;
  font-weight: 900;
}
.tabela {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
}
</style>
