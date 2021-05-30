/*
  This file is meant to store the state of the database 
  The pointers to the database should be stored here
  as well as important information!
*/

import level from 'level';
import sub from 'subleveldown';
import Macros from './support/Macros';
import { LevelDB } from 'level';
import { _SubLevelDB } from './global';

const { PATH } = Macros;

class DBState {
  // Fields
  AppDB: LevelDB;
  Canvas: _SubLevelDB;
  Settings: _SubLevelDB;
  Skills: _SubLevelDB;

  // Constructor
  constructor() {
    this.AppDB = undefined;
    this.Canvas = undefined;
    this.Settings = undefined;
    this.Skills = undefined;
  }

  // Methods
  async init() {
    // Options for every instance of database
    const options = {
      valueEncoding: 'json',
    };

    // Opening up the databases
    try {
      await new Promise((resolve, reject) => {
        this.AppDB = level(PATH, options, (err) => {
          if (err) reject(err);
          resolve('AppDB was initialized successfully!');
        });
      });

      this.Canvas = sub(this.AppDB, 'Canvas', options);
      this.Settings = sub(this.AppDB, 'Settings', options);
      this.Skills = sub(this.Canvas, 'Skills', options);

      return 0;
    } catch (err) {
      return 1;
    }
  }

  async terminate() {
    try {
      await this.Skills.close();
      await this.Settings.close();
      await this.Canvas.close();
      await this.AppDB.close();

      this.Skills = undefined;
      this.Settings = undefined;
      this.Canvas = undefined;
      this.AppDB = undefined;
      return 0;
    } catch (err) {
      return 1;
    }
  }
}

const AppDB = new DBState();

export default AppDB;
