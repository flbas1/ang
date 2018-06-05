import { Injectable } from '@angular/core';
import { EntryPoint } from './entry-point.service';
import { IRandomizer } from './irandomizer.interface';
import { DefaultRandomizer } from './default-randomizer.service';

enum Ret { Unique, NotUnique, NoSolution }

@Injectable({
  providedIn: 'root'
})

export class SudukuService {

  m_sudoku: number[][] = [[]];
  constructor() {
    for (var y = 0; y < 9; y++) {
      this.m_sudoku[y] = [];
      for (var x = 0; x < 9; x++)
        this.m_sudoku[y][x] = 0;
    }
  }

  //suduku(): void {
  // 0 = solve for


  // Maps sub square index to m_sudoku
  m_subIndex: EntryPoint[][] =
    [
      [new EntryPoint(0, 0), new EntryPoint(0, 1), new EntryPoint(0, 2), new EntryPoint(1, 0), new EntryPoint(1, 1), new EntryPoint(1, 2), new EntryPoint(2, 0), new EntryPoint(2, 1), new EntryPoint(2, 2)],
      [new EntryPoint(0, 3), new EntryPoint(0, 4), new EntryPoint(0, 5), new EntryPoint(1, 3), new EntryPoint(1, 4), new EntryPoint(1, 5), new EntryPoint(2, 3), new EntryPoint(2, 4), new EntryPoint(2, 5)],
      [new EntryPoint(0, 6), new EntryPoint(0, 7), new EntryPoint(0, 8), new EntryPoint(1, 6), new EntryPoint(1, 7), new EntryPoint(1, 8), new EntryPoint(2, 6), new EntryPoint(2, 7), new EntryPoint(2, 8)],
      [new EntryPoint(3, 0), new EntryPoint(3, 1), new EntryPoint(3, 2), new EntryPoint(4, 0), new EntryPoint(4, 1), new EntryPoint(4, 2), new EntryPoint(5, 0), new EntryPoint(5, 1), new EntryPoint(5, 2)],
      [new EntryPoint(3, 3), new EntryPoint(3, 4), new EntryPoint(3, 5), new EntryPoint(4, 3), new EntryPoint(4, 4), new EntryPoint(4, 5), new EntryPoint(5, 3), new EntryPoint(5, 4), new EntryPoint(5, 5)],
      [new EntryPoint(3, 6), new EntryPoint(3, 7), new EntryPoint(3, 8), new EntryPoint(4, 6), new EntryPoint(4, 7), new EntryPoint(4, 8), new EntryPoint(5, 6), new EntryPoint(5, 7), new EntryPoint(5, 8)],
      [new EntryPoint(6, 0), new EntryPoint(6, 1), new EntryPoint(6, 2), new EntryPoint(7, 0), new EntryPoint(7, 1), new EntryPoint(7, 2), new EntryPoint(8, 0), new EntryPoint(8, 1), new EntryPoint(8, 2)],
      [new EntryPoint(6, 3), new EntryPoint(6, 4), new EntryPoint(6, 5), new EntryPoint(7, 3), new EntryPoint(7, 4), new EntryPoint(7, 5), new EntryPoint(8, 3), new EntryPoint(8, 4), new EntryPoint(8, 5)],
      [new EntryPoint(6, 6), new EntryPoint(6, 7), new EntryPoint(6, 8), new EntryPoint(7, 6), new EntryPoint(7, 7), new EntryPoint(7, 8), new EntryPoint(8, 6), new EntryPoint(8, 7), new EntryPoint(8, 8)]
    ];


  // Maps sub square to index
  private m_subSquare: any[] =
    [
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [0, 0, 0, 1, 1, 1, 2, 2, 2],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [3, 3, 3, 4, 4, 4, 5, 5, 5],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
      [6, 6, 6, 7, 7, 7, 8, 8, 8],
      [6, 6, 6, 7, 7, 7, 8, 8, 8]
    ];

  /// <summary>
  /// Sudoku byte[9,9] array
  /// </summary>
  // public  Data:any[];

  get Data(): any {
    // return m_sudoku.Clone() as byte[,;];
    let clone = Object.create(this.m_sudoku);
    return clone;
  }

  set Data(value: any) {
    // if (value.length == 2 && value.GetUpperBound(0) == 8 && value.GetUpperBound(1) == 8) {
      console.log("board created!");
      
      this.m_sudoku = value;

      
       let line:string="";
       for(var y in value){
         line="";
       for (var x in value)
       {
       line +=value[y][x] + " ";
       }
       
      }
      console.log(line);

    // }
    // else
    //   throw new Error("Array has wrong size");
  }


  //  //IRandomizer randomizer = new DefaultRandomizer();
  // let randomizer: DefaultRandomizer = new DefaultRandomizer();

  // // class Randomizer implements IRandomizer {
  // get GetInt(min: number, max: number): any {
  //   return randomizer;
  // };

  // set Randomizer(value: DefaultRandomizer) {
  //   randomizer = value;
  // }


  /// <summary>
  /// Solves the given Sudoku.
  /// </summary>
  /// <returns>Success</returns>
  Solve(): boolean {
    // Find untouched location with most information
    let xp: number = 0;
    let yp: number = 0;
    let Mp: number[] = null;
    let cMp: number = 10;

    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 9; x++) {
        // Is this spot unused?
        if (this.m_sudoku[y][x] == 0) {
          // Set M of possible solutions
          let M = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

          // Remove used numbers in the vertical direction
          for (var a = 0; a < 9; a++)
            M[this.m_sudoku[a][x]] = 0;

          // Remove used numbers in the horizontal direction
          for (var b = 0; b < 9; b++)
            M[this.m_sudoku[y][b]] = 0;

          // Remove used numbers in the sub square.
          let squareIndex = this.m_subSquare[y][x];
          for (var c = 0; c < 9; c++) {
            let p = this.m_subIndex[squareIndex][c];

            M[this.m_sudoku[p.x][p.y]] = 0;
          }

          let cM: number = 0;
          // Calculate cardinality of M
          for (var d = 1; d < 10; d++)
            cM += M[d] == 0 ? 0 : 1;

          // Is there more information in this spot than in the best yet?
          if (cM < cMp) {
            cMp = cM;
            Mp = M;
            xp = x;
            yp = y;
          }
        }
      }
    }

    // Finished?
    if (cMp == 10) {
      return true;
    }

    // Couldn't find a solution?
    if (cMp == 0) {
      return false;
    }

    // Try elements
    for (var i = 1; i < 10; i++) {
      if (Mp[i] != 0) {
        this.m_sudoku[yp][xp] = Mp[i];
        if (this.Solve()) {
          return true;
        }
      }
    }

    // Restore to original state.
    this.m_sudoku[yp][xp] = 0;
    return false;
  }

  /// <summary>
  /// Generate a new Sudoku from the template.
  /// </summary>
  /// <param name="spots">Number of set spots in Sudoku.</param>
  /// <param name="numberOfTries">Number of tries before ending generation.</param>
  /// <returns>(Number of tries, success)</returns>
  Generate(spots: number, numberOfTries: number): [number, boolean] {
    if (numberOfTries === 0)
      numberOfTries = 1000000;

    // Number of set spots.
    let num: number = this.GetNumberSpots();

    if (!this.IsSudokuFeasible() || num > spots) {
      // The supplied data is not feasible.
      // - or -
      // The supplied data has too many spots set.
      return [0, false];
      //return Tuple.Create(0L, false);
    }

    /////////////////////////////////////
    // Randomize spots
    /////////////////////////////////////

    var originalData = this.Data;

    let tries: number = 0;
    for (; tries < numberOfTries; tries++) {
      // Try to generate spots
      if (this.Gen(spots - num)) {
        // Test if unique solution.
        if (this.IsSudokuUnique()) {
          //return Tuple.Create(tries, true);
          return [tries, true];
        }
      }

      // Start over.
      this.Data = originalData;
    }

    //return Tuple.Create(tries, false);
    return [tries, false];
  }

  /// <summary>
  /// Fast test if the data is feasible. 
  /// Does not check if there is more than one solution.
  /// </summary>
  /// <returns>True if feasible</returns>
  IsSudokuFeasible(): boolean {
    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 9; x++) {
        // Set M of possible solutions
        let M: number[]=[];

        // Count used numbers in the vertical direction
        for (var a = 0; a < 9; a++)
          M[this.m_sudoku[a][x]]++;
        // Sudoku feasible?
        if (!this.Feasible(M)) {
          return false;
        }

        M = [];
        // Count used numbers in the horizontal direction
        for (var b = 0; b < 9; b++)
          M[this.m_sudoku[y][b]]++;
        if (!this.Feasible(M)) {
          return false;
        }

        M = [];
        // Count used numbers in the sub square.
        let squareIndex = this.m_subSquare[y][x];
        for (var c = 0; c < 9; c++) {
          let p = this.m_subIndex[squareIndex][c];
          if (p.x != y && p.y != x) {
            M[this.m_sudoku[p.x][p.y]]++;
          }
        }
        if (!this.Feasible(M)) {
          return false;
        }
      }
    }

    return true;
  }

  /// <summary>
  /// Test generated Sudoku for solvability.
  /// A true Sudoku has one and only one solution.
  /// </summary>
  /// <returns>True if unique</returns>
  IsSudokuUnique(): boolean {
    let m = this.Data;
    let b: boolean = this.TestUniqueness() == Ret.Unique;
    this.Data = m;
    return b;
  }

  // Generate spots
  Gen(spots: number): boolean {
    for (var i = 0; i < spots; i++) {
      let xRand: number, yRand: number;

      do {
        xRand = new DefaultRandomizer().GetInt(0, 9);
        yRand = new DefaultRandomizer().GetInt(0, 9);
      } while (this.m_sudoku[yRand][xRand] != 0);

      /////////////////////////////////////
      // Get feasible values for spot.
      /////////////////////////////////////

      // Set M of possible solutions
      let M: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      // Remove used numbers in the vertical direction
      for (var a = 0; a < 9; a++)
        M[this.m_sudoku[a][xRand]] = 0;

      // Remove used numbers in the horizontal direction
      for (var b = 0; b < 9; b++)
        M[this.m_sudoku[yRand][b]] = 0;

      // Remove used numbers in the sub square.
      let squareIndex = this.m_subSquare[yRand][xRand];
      for (var c = 0; c < 9; c++) {
        let p = this.m_subIndex[squareIndex][c];
        M[this.m_sudoku[p.x][p.y]] = 0;
      }

      let cM: number = 0;
      // Calculate cardinality of M
      for (var d = 1; d < 10; d++)
        cM += M[d] == 0 ? 0 : 1;

      // Is there a number to use?
      if (cM > 0) {
        let e = 0;

        do {
          // Randomize number from the feasible set M
          e = new DefaultRandomizer().GetInt(1, 10);
        } while (M[e] == 0);

        // Set number in Sudoku
        this.m_sudoku[yRand][xRand] = e;
      }
      else {
        // Error
        return false;
      }
    }

    // Successfully generated a feasible set.
    return true;
  }



  // Is there one and only one solution?
  TestUniqueness(): Ret {
    // Find untouched location with most information
    let xp: number = 0;
    let yp: number = 0;
    let Mp: number[] = null;
    let cMp: number = 10;

    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 9; x++) {
        // Is this spot unused?
        if (this.m_sudoku[y][x] == 0) {
          // Set M of possible solutions
          let M: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

          // Remove used numbers in the vertical direction
          for (var a = 0; a < 9; a++)
            M[this.m_sudoku[a][x]] = 0;

          // Remove used numbers in the horizontal direction
          for (var b = 0; b < 9; b++)
            M[this.m_sudoku[y][b]] = 0;

          // Remove used numbers in the sub square.
          let squareIndex: number = this.m_subSquare[y][x];
          for (var c = 0; c < 9; c++) {
            let p = this.m_subIndex[squareIndex][c];
            M[this.m_sudoku[p.x][p.y]] = 0;
          }

          let cM: number = 0;
          // Calculate cardinality of M
          for (var d = 1; d < 10; d++)
            cM += M[d] == 0 ? 0 : 1;

          // Is there more information in this spot than in the best yet?
          if (cM < cMp) {
            cMp = cM;
            Mp = M;
            xp = x;
            yp = y;
          }
        }
      }
    }

    // Finished?
    if (cMp == 10) {
      return Ret.Unique;
    }

    // Couldn't find a solution?
    if (cMp == 0) {
      return Ret.NoSolution;
    }

    // Try elements
    let success: number = 0;
    for (var i = 1; i < 10; i++) {
      if (Mp[i] != 0) {
        this.m_sudoku[yp][xp] = Mp[i];

        switch (this.TestUniqueness()) {
          case Ret.Unique:
            success++;
            break;

          case Ret.NotUnique:
            return Ret.NotUnique;

          case Ret.NoSolution:
            break;
        }

        // More than one solution found?
        if (success > 1) {
          return Ret.NotUnique;
        }
      }
    }

    // Restore to original state.
    this.m_sudoku[yp][xp] = 0;

    switch (success) {
      case 0:
        return Ret.NoSolution;

      case 1:
        return Ret.Unique;

      default:
        // Won't happen.
        return Ret.NotUnique;
    }
  }

  Feasible(M: number[]): boolean {
    for (var d = 1; d < 10; d++)
      if (M[d] > 1) {
        return false;
      }

    return true;
  }

  GetNumberSpots(): number {
    let num: number = 0;

    for (var y = 0; y < 9; y++)
      for (var x = 0; x < 9; x++)
        num += this.m_sudoku[y][x] === 0 ? 0 : 1;

    return num;
  }
}