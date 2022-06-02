import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
     const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
     };
    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({...task}))
    
    const foundItem = updateTasks.find(item => item.id === id)

    if(!foundItem)
    return; 

    foundItem.done = !foundItem.done
    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks((oldState) => oldState.filter((tasks) => tasks.id != id))
   
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={(id) => handleRemoveTask(id)} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})