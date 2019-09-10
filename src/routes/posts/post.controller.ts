import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import Controller from '../../interfaces/controller.interface'
import CreatePostDto from './post.dto'
import Post from './post.entity'
import validationMiddleware from '../../middleware/validation.middleware'
import InternalServerError from '../../exceptions/InternalServerError'
import NotFound from '../../exceptions/NotFound'

export default class PostsController implements Controller {
  public path = '/posts'
  public router = express.Router()
  private postRepository = getRepository(Post)

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts)
    this.router.get(`${this.path}/:id`, this.getPostById)
    this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost)
    this.router.put(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
    this.router.delete(`${this.path}/:id`, this.deletePost)
  }

  private getAllPosts = async (req: Request, res: Response) => {
    const posts = await this.postRepository.find()
    res.send(posts)
  }

  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const post = await this.postRepository.findOne(id)
    if (post) {
      res.send(post)
    } else {
      next(new NotFound('Post'))
    }
  }

  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    const postData: CreatePostDto = req.body
    try {
      const newPost = this.postRepository.create(postData)
      await this.postRepository.save(newPost)
      res.send(newPost)
    } catch (err) {
      next(new InternalServerError())
    }
  }

  private modifyPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const postData: Post = req.body
      await this.postRepository.update(id, postData)
      const updatedPost = await this.postRepository.findOne(id)
      if (updatedPost) {
        res.send(updatedPost)
      } else {
        next(new NotFound('Post'))
      }
    } catch (err) {
      next(new InternalServerError())
    }
  }

  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const deleteResponse = await this.postRepository.delete(id)
      if (deleteResponse.affected) {
        res.sendStatus(200)
      } else {
        next(new NotFound('Post'))
      }
    } catch {
      next(new InternalServerError())
    }
  }
}
