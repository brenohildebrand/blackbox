// BlackBox Database API
// Global Types and Interfaces
import { LevelUp } from 'levelup';
import { AbstractLevelDOWN, AbstractIterator } from 'abstract-leveldown';

//---------------//
// API Functions //
//---------------//

type _OpenDB = () => Promise<_Response>;

type _CreateDB = (arg: {
  type: 'skill';
  data: Omit<_Skill, '_id'>;
}) => Promise<_Response>;

type _ReadDB = (
  arg:
    | { type: 'skill'; ID: _ID }
    | { type: 'database'; ID: 'Settings' | 'Skills' },
) => Promise<_Response>;

type _UpdateDB = (arg: {
  type: 'skill';
  ID: _ID;
  data: Omit<_Skill, '_id'>;
}) => Promise<_Response>;

type _DeleteDB = (arg: { type: 'skill'; ID: _ID }) => Promise<_Response>;

type _CloseDB = () => Promise<_Response>;

//-------------------//
// Support Functions //
//-------------------//

type _ResponseFunction = (arg: _Response) => _Response;

//---------------//
// General Types //
//---------------//

type _ID = string;
type _status = 'complete' | 'incomplete';

type _Response = {
  code: number;
  message: string;
  result: any;
};

type _SkillWithoutID = Omit<_Skill, '_id'>;

type _SubLevelDB = LevelUp<
  AbstractLevelDOWN<any, any>,
  AbstractIterator<any, any>
>;

//----------------//
// Support Macros //
//----------------//

interface Macros {
  PATH: string;
}

//--------------------//
// General Interfaces //
//--------------------//

interface _Skill {
  _id: _ID;
  title: string;
  description: string;
  icon: string;
  difficulty: number;
  status: _status;
  tasks: Array<_Task>;
  neighbours: Array<_ID>;
}

interface _Task {
  _id: _ID;
  title: string;
  description: string;
  icon: string;
  status: _status;
}
