<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <div class="form">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Title">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Note">
        <el-input class="textarea" type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createNote">Create</el-button>
        <el-button @click="cancelNote">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>


  <div class="card box">
    <el-card class="card_item" v-for="(note, key) in filteredNotes">
      <div v-if="!note.edit" slot="header" class="clearfix">
        <span @click="setEditNote(key)">{{ note.name }}</span>
        <el-button @click="deleteNote(key)" type="primary" icon="el-icon-delete" style="float: right; padding: 3px"></el-button>
      </div>
      <div v-else slot="header" class="clearfix">
        <span><el-input type="text" v-model="note.name"></el-input></span>
      </div>
      <div v-if="!note.edit" @click="setEditNote(key)" class="text item">
        {{ note.desc }}
      </div>
      <div v-else class="text item">
        <el-input type="textarea" v-model="note.desc"></el-input>
        <el-button @click="saveEditNote(note, key)" type="success" icon="el-icon-check" circle style="float: right; padding: 3px; margin: 10px"></el-button>
      </div>
    </el-card>
  </div>

  <el-button type="info" @click="signOut">Sign out</el-button>
</div>

</template>

<script>
import firebase from 'firebase'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Note App',
      database: null,
      notesRef: null,
      name: firebase.auth().currentUser.email,
      form: {
        name: '',
        desc: ''
      },
      showNoteType: 'all',
      activeNames: ['1'],
      notes: []
    };
  },
  created: function() {
    this.database = firebase.database();
    this.notesRef = this.database.ref('notes');

    var _this = this;
    this.notesRef.on('value', function(snapshot) {
      _this.notes = snapshot.val(); // データに変化があったときに再取得
    });
  },
  computed: {
    filteredNotes: function() {
      if (this.showNoteType == 'all'){
        return this.notes;
      } else {
        var showIsComplate = false;
        if(this.showNoteType == 'complete'){
          showIsComplate = true
        }
        var filterNotes ={};
        for (var key in this.notes) {
          var note = this.notes[key];
          if (note.isComplete == showIsComplate) {
            filterNotes[key] = note;
          }
        }
        return filterNotes;
      }
    }
  },
  methods: {
    signOut: function() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
    createNote: function() {
      if (this.form.name == ""){
        return;
      }
      if (this.form.desc == ""){
        return;
      }
      this.notesRef.push({
        name: this.form.name,
        desc: this.form.desc,
        isComplete: false,
        edit: false
      })
      this.form.name = '';
      this.form.desc = '';
    },
    cancelNote: function(){
      this.form.name = "";
      this.form.desc = "";
    },
    deleteNote: function(key) {
      this.notesRef.child(key).remove();
    },
    setEditNote(key) {
      this.notesRef.child(key).update({
        edit: true
      })
    },
    saveEditNote(note, key) {
      this.notesRef.child(key).set({
        name: note.name,
        desc: note.desc,
        edit:false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.form {
  width: 50%;
  height: 50%;
  margin: 0 auto;
}

.textarea {
  resize: horizontal;
  height: 100%;
}

.box.card {
  display: flex;
  flex-wrap: wrap;
}

.box .card_item {
  width: calc(33% - 10px);
  margin: 0 15px 15px 0;
}

.box .card_item:nth-child(3n) {
  margin-right: 0;
}
</style>
