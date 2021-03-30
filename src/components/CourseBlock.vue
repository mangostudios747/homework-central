<template>
  <div class="card">
    <div :class="'card-body text-' + color">
      <h4 class="card-title">
        {{ name
        }}<button
          data-toggle="modal"
          :onclick="
            'app.focusedClass=' +
            index +
            ';document.getElementById(\`eCName\`).value=\`' +
            name +
            '\`;document.getElementById(\`eCColor\`).value=\`' +
            color +
            '\`;document.getElementById(\`eCTeacher\`).value=\`' +
            teacher +
            '\`'
          "
          data-target="#ecm"
          class="float-right btn"
        >
          <i class="fas fa-pen"></i>
        </button>
      </h4>
      <p class="card-text">{{ teacher }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li v-if="assignments.length == 0" class="list-group-item blank column">
        <div class="row text-muted">
          <img height="10rem" src="bootstrap-icons/done.svg" />
        </div>
        <div class="row text-center">
          <p class="text-muted">Nothing to do!</p>
        </div>
      </li>
      <template>
        <li
          :key="aIndex"
          v-for="(assignment, aIndex) in assignments"
          :class="'list-group-item list-group-item-' + color"
        >
          <a
            :onclick="
              'app.classes[' +
              index +
              '].assignments.splice(' +
              aIndex +
              ',1);save()'
            "
            style="text-decoration: none; cursor: pointer"
            class="display-6 mt-4 text-muted close float-right"
            >&times;</a
          >
          <h5 class="pt-2">
            <div class="">
              <button
                type="button"
                class="btn"
                :id="index + '-' + aIndex"
                :onclick="
                  'setTimeout(()=>{app.classes[' +
                  index +
                  '].completed.push(app.classes[' +
                  index +
                  '].assignments[' +
                  aIndex +
                  ']);app.classes[' +
                  index +
                  '].assignments.splice(' +
                  aIndex +
                  ',1);save();},100)'
                "
              >
                <i class="far text-white fa-square"></i>
              </button>
              <label class="" :for="index + '-' + aIndex"
                >{{ assignment.name }} <i class="ml-2 fas fa-pen"></i
              ></label>
            </div>
          </h5>
          <p class="text-muted">{{ assignment.due.toDateString() }}</p>
        </li>
      </template>
      <li
        class="list-group-item blank dropdown-toggle"
        style="cursor: pointer"
        data-toggle="collapse"
        :href="'#completed-' + index"
        aria-expanded="false"
        aria-controls="'completed-'+index"
      >
        Completed
      </li>
    </ul>

    <ul class="list-group list-group-flush collapse" :id="'completed-' + index">
      <li v-if="completed.length == 0" class="list-group-item blank column">
        <div class="row text-muted">
          <i style="height: 3rem; width: 3rem" class="mx-auto fas fa-tasks"></i>
        </div>
        <div class="row text-center">
          <p class="text-muted">Nothing done yet!</p>
        </div>
      </li>
      <li
        :key="cIndex"
        v-for="(cAssignment, cIndex) in completed"
        :class="'list-group-item list-group-item-' + color"
      >
        <a
          :onclick="
            'app.classes[' +
            index +
            '].completed.splice(' +
            cIndex +
            ',1);save()'
          "
          style="text-decoration: none; cursor: pointer"
          class="display-6 mt-4 text-muted close float-right"
          >&times;</a
        >
        <h5 class="pt-2">
          <button
            type="button"
            class="btn"
            :id="index + '-' + cIndex"
            :onclick="
              'setTimeout(()=>{app.classes[' +
              index +
              '].assignments.push(app.classes[' +
              index +
              '].completed[' +
              cIndex +
              ']);app.classes[' +
              index +
              '].completed.splice(' +
              cIndex +
              ',1);save();},100)'
            "
          >
            <i class="fas fa-check-square"></i>
          </button>
          <s>{{ cAssignment.name }}</s>
        </h5>
        <p class="text-muted">{{ cAssignment.due.toDateString() }}</p>
      </li>
    </ul>
    <div class="card-body">
      <div class="float-right">
        <a
          href="./"
          :class="'card-link btn btn-' + color"
          data-toggle="modal"
          :onclick="'app.focusedClass=' + index"
          data-target="#nam"
          >New</a
        >
        <button
          href="./"
          :class="'card-link btn btn-outline-' + color"
          :onclick="
            'app.classes[' +
            index +
            '].completed = app.classes[' +
            index +
            '].completed.concat(app.classes[' +
            index +
            '].assignments);app.classes[' +
            index +
            '].assignments = [];'
          "
        >
          Mark all as done
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseBlock",
  props: ["color", "name", "teacher", "assignments", "index", "completed"],
};
</script>

<style scoped></style>
