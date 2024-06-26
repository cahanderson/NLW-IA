import { Button } from './components/ui/button'
import {Github,FileVideo,Upload,Wand2} from 'lucide-react'
import { Separator } from './components/ui/separator'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Slider } from './components/ui/slider'

export function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='px-6 py-3 flex border-b items-center justify-between'>
        <h1 className='text-xl font-bold'>upload.ai</h1>
        <div className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground'>
            Desenvolvido com Amor no NLW da Rocketseat
          </span>
            <Separator orientation='vertical' className='h-6' />
            <Button variant={'outline'}>
              <Github className='w-4 h-4 mr-2'/>
              Github
            </Button>
        </div>
      </div>
      <main className='flex-1 p-6 flex gap-6'>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea
              className='resize-none p-4 leading-relaxed' 
              placeholder='Inclua o promt para a IA...'
            />
            <Textarea 
              className='resize-none p-4 leading-relaxed' 
              placeholder='Resultado gerado pela IA...'
            />

          </div>

          <p className='text-sm text-muted-foreground'>
            Lembre-se: Você pode utilizar uma variável <code className='text-violet-400'>{'{trascription}'}</code> no seu promt para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>

        </div>
        <aside className='w-80 space-y-6'>
          <form className='space-y-6'>
            <label 
              htmlFor='video' 
              className='border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
            >
              <FileVideo className='w-4 h-4'/>
              Selecione um video
            </label>
            
            <input type='file' id='video' accept='video/mp4' className='sr-only' />

            <Separator />

            <div className='space-y-2'>
              <Label htmlFor='transcription_promt'>Promt de Transcrição</Label>
              <Textarea
                id='transcription_promt' 
                className='h-20 leading-relaxed resize-none'
                placeholder='Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)'
              />
            </div>
            <Button type='submit' className='w-full'>
              Carregar vídeo
              <Upload className='w-4 h-4 ml-2'/>
            </Button>
          </form>

          <Separator />

          <form className='space-y-6'>

          <div className='space-y-2'>
              <Label>Promt</Label>
              <Select >
                <SelectTrigger>
                  <SelectValue placeholder='Selecione um promt' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='valueTitle'>Título do youtube</SelectItem>
                  <SelectItem value='valueDescription'>Descrição do youtube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Modelo</Label>
              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5 - turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className='block text-xs italic text-muted-foreground'>
                ml-2ocê poderá customizar esta opção em breve
              </span>
            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperatura</Label>
              <Slider 
                min={0}
                max={1}
                step={0.1}
              />
              <span className='block text-xs italic text-muted-foreground'>
                valores mais altos tendem a deixar os valores mais criativos e com possíveis erros.
              </span>
            </div>

            <Separator />
            <Button type='submit'className='w-full'>
              Executar
              <Wand2 className='w-4 h-4 ml-2'/>
            </Button>

          </form>

        </aside>
      </main>
    </div>
  )
}
