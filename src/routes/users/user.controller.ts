import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import Controller from '../../interfaces/controller.interface'
import CreateUserDto from "./user.dto"
import User from "./user.entity"
import validationMiddleware from "../../middleware/validation.middleware"
import { InternalServerError, NotFound } from "../../exceptions/HttpException"


export default class UsersController implements Controller {
  public path = '/users'
  public router = express.Router()
  private userRepository = getRepository(User)

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllUsers)
    this.router.get(`${this.path}/:id`, this.getUserById)
    this.router.post(this.path, validationMiddleware(CreateUserDto), this.createUser)
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.modifyUser)
    this.router.delete(`${this.path}/:id`, this.deleteUser)
  }

  private getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userRepository.find()
      res.send(users)
    } catch (err) {
      console.log(err)
      next(new InternalServerError())
    }
  }

  private getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const user = await this.userRepository.findOne(id)
      if (user) {
        res.send(user)
      } else {
        next(new NotFound('User'))
      }
    } catch (err) {
      console.log(err)
      next(new InternalServerError())
    }
  }

  private createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body
    try {
      const newUser = this.userRepository.create(userData)
      await this.userRepository.save(newUser)
      res.send(newUser)
    } catch (err) {
      console.log(err)
      next(new InternalServerError())
    }
  }

  private modifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const userData: User = req.body
      await this.userRepository.update(id, userData)
      const updatedUser = await this.userRepository.findOne(id)
      if (updatedUser) {
        res.send(updatedUser)
      } else {
        next(new NotFound('User'))
      }
    } catch (err) {
      console.log(err)
      next(new InternalServerError())
    }
  }

  private deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const deleteResponse = await this.userRepository.delete(id)
      if (deleteResponse.affected) {
        res.sendStatus(200)
      } else {
        next(new NotFound('User'))
      }
    } catch (err) {
      console.log(err)
      next(new InternalServerError())
    }
  }

}
